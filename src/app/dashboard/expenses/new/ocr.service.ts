/**
 * OCR Service (Client-Side)
 *
 * Uses Tesseract.js (WebAssembly) to extract text from receipt images,
 * then applies intelligent regex-based parsing to extract structured
 * expense data. Runs entirely in the browser — no server calls.
 *
 * Extraction pipeline:
 *   Image → Tesseract.js → Raw Text → Parser → OcrResult
 */

import Tesseract from "tesseract.js";

// ─── Public Types ───

export interface OcrLineItem {
  description: string;
  amount: number;
}

export interface OcrResult {
  rawText: string;
  merchantName: string | null;
  totalAmount: number | null;
  currency: string | null;
  date: string | null; // ISO date string (YYYY-MM-DD)
  lineItems: OcrLineItem[];
  suggestedCategory: string | null;
  confidence: number; // 0–100
}

export type OcrProgressCallback = (progress: number) => void;

// ─── Currency Detection ───

const CURRENCY_PATTERNS: Array<{ symbol: string; code: string }> = [
  { symbol: "₹", code: "INR" },
  { symbol: "rs", code: "INR" },
  { symbol: "inr", code: "INR" },
  { symbol: "$", code: "USD" },
  { symbol: "usd", code: "USD" },
  { symbol: "€", code: "EUR" },
  { symbol: "eur", code: "EUR" },
  { symbol: "£", code: "GBP" },
  { symbol: "gbp", code: "GBP" },
  { symbol: "¥", code: "JPY" },
  { symbol: "jpy", code: "JPY" },
  { symbol: "cny", code: "CNY" },
  { symbol: "aed", code: "AED" },
];

// ─── Category Keywords ───

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Food: [
    "restaurant",
    "cafe",
    "coffee",
    "pizza",
    "burger",
    "food",
    "dine",
    "dining",
    "eat",
    "meal",
    "lunch",
    "dinner",
    "breakfast",
    "bistro",
    "grill",
    "bakery",
    "bar",
    "pub",
    "kitchen",
    "swiggy",
    "zomato",
    "uber eats",
    "doordash",
    "mcdonald",
    "starbucks",
    "subway",
    "domino",
    "kfc",
    "taco",
    "sushi",
    "noodle",
    "biryani",
    "chai",
    "tea",
    "snack",
  ],
  Travel: [
    "uber",
    "ola",
    "lyft",
    "cab",
    "taxi",
    "flight",
    "airline",
    "airport",
    "railway",
    "train",
    "bus",
    "metro",
    "fuel",
    "petrol",
    "diesel",
    "gas station",
    "toll",
    "parking",
    "car rental",
    "indigo",
    "spicejet",
    "air india",
    "vistara",
    "rapido",
    "redbus",
    "irctc",
  ],
  Accommodation: [
    "hotel",
    "motel",
    "inn",
    "resort",
    "lodge",
    "hostel",
    "airbnb",
    "oyo",
    "stay",
    "room",
    "suite",
    "marriott",
    "hilton",
    "hyatt",
    "taj",
    "radisson",
  ],
  Software: [
    "software",
    "subscription",
    "license",
    "saas",
    "cloud",
    "aws",
    "azure",
    "google cloud",
    "github",
    "notion",
    "slack",
    "figma",
    "adobe",
    "microsoft",
    "zoom",
    "atlassian",
    "jira",
  ],
  "Office Supplies": [
    "stationery",
    "office",
    "paper",
    "printer",
    "ink",
    "pen",
    "pencil",
    "stapler",
    "desk",
    "chair",
    "amazon",
    "flipkart",
    "office depot",
  ],
};

// ─── Public API ───

/**
 * Extracts structured expense data from a receipt image.
 *
 * @param imageSource  - File, Blob, or base64 data URL
 * @param onProgress   - Optional callback for progress updates (0–100)
 * @returns Parsed OCR result with extracted fields
 */
export async function extractReceiptData(
  imageSource: File | Blob | string,
  onProgress?: OcrProgressCallback,
): Promise<OcrResult> {
  // Run Tesseract.js OCR
  const result = await Tesseract.recognize(imageSource, "eng", {
    logger: (m: { status: string; progress: number }) => {
      if (m.status === "recognizing text" && typeof m.progress === "number") {
        onProgress?.(Math.round(m.progress * 100));
      }
    },
  });

  const rawText = result.data.text;
  const confidence = result.data.confidence;

  // Parse structured fields from raw text
  const parsed = parseReceiptText(rawText);

  return {
    rawText,
    confidence,
    ...parsed,
  };
}

/**
 * Convert a File to a base64 data URL for storage.
 */
export function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Parser ───

interface ParsedFields {
  merchantName: string | null;
  totalAmount: number | null;
  currency: string | null;
  date: string | null;
  lineItems: OcrLineItem[];
  suggestedCategory: string | null;
}

function parseReceiptText(text: string): ParsedFields {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return {
    merchantName: extractMerchantName(lines),
    totalAmount: extractTotalAmount(text),
    currency: extractCurrency(text),
    date: extractDate(text),
    lineItems: extractLineItems(lines),
    suggestedCategory: suggestCategory(text),
  };
}

/**
 * Merchant name is typically the first non-trivial line(s) of a receipt.
 * We skip lines that look like addresses, dates, or numbers.
 */
function extractMerchantName(lines: string[]): string | null {
  const skipPatterns = [
    /^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/, // date
    /^\d+$/, // pure numbers
    /^tel|^ph|^fax|^www|^http|^email/i, // contact info
    /^\d+[\s,].*(?:road|street|ave|blvd|lane|drive|st\.|rd\.|city|state|zip)/i, // address
    /^gst|^gstin|^tin|^pan|^cin/i, // tax identifiers
    /^invoice|^receipt|^bill|^order/i, // document type labels
    /^tax/i, // tax lines
  ];

  for (const line of lines.slice(0, 5)) {
    if (line.length < 2 || line.length > 60) continue;

    const isSkippable = skipPatterns.some((p) => p.test(line));
    if (isSkippable) continue;

    // Clean up: remove trailing special chars
    const cleaned = line.replace(/[*#=\-_]+$/g, "").trim();
    if (cleaned.length >= 2) {
      return cleaned;
    }
  }

  return null;
}

/**
 * Extracts the total / grand total amount.
 * Searches for patterns like "Total: $42.50", "GRAND TOTAL 1,234.56", etc.
 * Falls back to the largest number in the text.
 */
function extractTotalAmount(text: string): number | null {
  const totalPatterns = [
    /(?:grand\s*total|total\s*amount|total\s*due|amount\s*due|net\s*total|total\s*payable|balance\s*due)\s*[:\s]*[₹$€£¥]?\s*([\d,]+\.?\d*)/gi,
    /(?:total)\s*[:\s]*[₹$€£¥]?\s*([\d,]+\.?\d*)/gi,
    /[₹$€£¥]\s*([\d,]+\.?\d*)\s*$/gm, // currency symbol followed by amount at line end
  ];

  // Try total-specific patterns first (prioritize "grand total" over "total")
  for (const pattern of totalPatterns) {
    const matches = [...text.matchAll(pattern)];
    if (matches.length > 0) {
      // Take the last match (grand total usually appears near the bottom)
      const lastMatch = matches[matches.length - 1];
      const value = parseAmount(lastMatch?.[1] ?? "");
      if (value !== null && value > 0) return value;
    }
  }

  // Fallback: find the largest number in the text
  const allNumbers = [...text.matchAll(/[\d,]+\.\d{2}/g)];
  if (allNumbers.length > 0) {
    const amounts = allNumbers
      .map((m) => parseAmount(m[0]))
      .filter((n): n is number => n !== null && n > 0);
    if (amounts.length > 0) return Math.max(...amounts);
  }

  return null;
}

function parseAmount(str: string): number | null {
  if (!str) return null;
  const cleaned = str.replace(/,/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

/**
 * Detects the currency from the raw text.
 */
function extractCurrency(text: string): string | null {
  const lowerText = text.toLowerCase();

  for (const { symbol, code } of CURRENCY_PATTERNS) {
    if (lowerText.includes(symbol)) return code;
  }

  // Check for explicit 3-letter currency codes
  const codeRegex = /\b(USD|EUR|GBP|INR|JPY|AED|CAD|AUD|SGD|CHF)\b/i;
  const codeMatch = codeRegex.exec(text);
  if (codeMatch) return codeMatch[1]!.toUpperCase();

  return null;
}

/**
 * Extracts dates from the text.
 * Supports formats: DD/MM/YYYY, MM/DD/YYYY, DD-MM-YYYY, DD MMM YYYY, YYYY-MM-DD
 */
function extractDate(text: string): string | null {
  const datePatterns: Array<{ regex: RegExp; parse: (m: RegExpMatchArray) => Date | null }> = [
    // YYYY-MM-DD (ISO)
    {
      regex: /(\d{4})-(\d{2})-(\d{2})/,
      parse: (m) => {
        const d = new Date(parseInt(m[1]!), parseInt(m[2]!) - 1, parseInt(m[3]!));
        return isValidDate(d) ? d : null;
      },
    },
    // DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
    {
      regex: /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/,
      parse: (m) => {
        const day = parseInt(m[1]!);
        const month = parseInt(m[2]!);
        const year = parseInt(m[3]!);
        // If day > 12, it's definitely DD/MM/YYYY
        // If month > 12, it's MM/DD/YYYY
        // Otherwise assume DD/MM/YYYY (more common internationally)
        if (day > 12) {
          return new Date(year, month - 1, day);
        }
        if (month > 12) {
          return new Date(year, day - 1, month);
        }
        return new Date(year, month - 1, day); // Default: DD/MM/YYYY
      },
    },
    // DD/MM/YY or DD-MM-YY
    {
      regex: /(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2})\b/,
      parse: (m) => {
        const day = parseInt(m[1]!);
        const month = parseInt(m[2]!);
        const year = 2000 + parseInt(m[3]!);
        return new Date(year, month - 1, day);
      },
    },
    // DD MMM YYYY or DD-MMM-YYYY (e.g., 15 Mar 2024)
    {
      regex: /(\d{1,2})\s*[\/\-\.]?\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*[\/\-\.]?\s*(\d{4})/i,
      parse: (m) => {
        const months: Record<string, number> = {
          jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
          jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
        };
        const monthIdx = months[m[2]!.toLowerCase().slice(0, 3)];
        if (monthIdx === undefined) return null;
        return new Date(parseInt(m[3]!), monthIdx, parseInt(m[1]!));
      },
    },
  ];

  for (const { regex, parse } of datePatterns) {
    const match = regex.exec(text);
    if (match) {
      const date = parse(match);
      if (date && isValidDate(date)) {
        return date.toISOString().split("T")[0]!;
      }
    }
  }

  return null;
}

function isValidDate(d: Date): boolean {
  if (isNaN(d.getTime())) return false;
  const year = d.getFullYear();
  return year >= 2000 && year <= 2030;
}

/**
 * Extracts individual line items with prices.
 * Looks for lines that end with a numeric amount.
 */
function extractLineItems(lines: string[]): OcrLineItem[] {
  const items: OcrLineItem[] = [];
  
  // Pattern: description text followed by an amount at the end
  const lineItemPattern = /^(.+?)\s+[₹$€£¥]?\s*([\d,]+\.?\d{0,2})\s*$/;

  // Keywords to skip (totals, taxes, etc.)
  const skipKeywords = [
    "total",
    "subtotal",
    "sub total",
    "tax",
    "gst",
    "cgst",
    "sgst",
    "igst",
    "vat",
    "service charge",
    "tip",
    "gratuity",
    "discount",
    "change",
    "cash",
    "card",
    "payment",
    "tendered",
    "balance",
    "round",
  ];

  for (const line of lines) {
    const match = lineItemPattern.exec(line);
    if (!match) continue;

    const description = match[1]!.trim();
    const amount = parseAmount(match[2]!);

    if (!amount || amount <= 0) continue;
    if (description.length < 2) continue;

    const lowerDesc = description.toLowerCase();
    const isSkippable = skipKeywords.some((kw) => lowerDesc.includes(kw));
    if (isSkippable) continue;

    items.push({ description, amount });
  }

  return items;
}

/**
 * Suggests an expense category based on keywords in the text.
 */
function suggestCategory(text: string): string | null {
  const lowerText = text.toLowerCase();

  let bestCategory: string | null = null;
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  return bestScore > 0 ? bestCategory : "Miscellaneous";
}
