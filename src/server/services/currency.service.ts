/**
 * Currency Service
 *
 * Handles:
 *   - Fetching country → currency mappings from restcountries.com
 *   - Fetching exchange rates from exchangerate-api.com
 *   - Caching rates in PostgreSQL (1-hour TTL)
 *   - Converting amounts between currencies
 */

import type { PrismaClient } from "../../../generated/prisma";

// ─── Types ───

interface CountryCurrency {
  countryName: string;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
}

interface ExchangeRateResponse {
  base: string;
  rates: Record<string, number>;
}

// ─── Constants ───

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const COUNTRIES_API = "https://restcountries.com/v3.1/all?fields=name,currencies";
const EXCHANGE_RATE_API = "https://api.exchangerate-api.com/v4/latest";

// ─── Public API ───

/**
 * Fetches all countries with their currencies from restcountries.com.
 * Returns a deduplicated, sorted list.
 */
export async function fetchCountriesWithCurrencies(): Promise<CountryCurrency[]> {
  const response = await fetch(COUNTRIES_API);
  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }

  const data = (await response.json()) as Array<{
    name: { common: string };
    currencies?: Record<string, { name: string; symbol: string }>;
  }>;

  const results: CountryCurrency[] = [];

  for (const country of data) {
    if (!country.currencies) continue;

    // Take the first currency for each country
    const entries = Object.entries(country.currencies);
    if (entries.length === 0) continue;
    
    const [code, info] = entries[0]!;
    if (!code || !info) continue;

    results.push({
      countryName: country.name.common,
      currencyCode: code,
      currencyName: info.name,
      currencySymbol: info.symbol || code,
    });
  }

  // Sort by country name
  return results.sort((a, b) => a.countryName.localeCompare(b.countryName));
}

/**
 * Gets the exchange rate between two currencies.
 * Uses cached rate if available and fresh (< 1 hour old).
 * Otherwise fetches from the API and updates the cache.
 */
export async function getExchangeRate(
  db: PrismaClient,
  fromCurrency: string,
  toCurrency: string,
): Promise<number> {
  if (fromCurrency === toCurrency) return 1;

  // Check cache first
  const cached = await db.exchangeRateCache.findUnique({
    where: {
      fromCurrencyId_toCurrencyId: {
        fromCurrencyId: fromCurrency,
        toCurrencyId: toCurrency,
      },
    },
  });

  const now = new Date();
  if (cached && now.getTime() - cached.fetchedAt.getTime() < CACHE_TTL_MS) {
    return Number(cached.rate);
  }

  // Fetch fresh rates
  const response = await fetch(`${EXCHANGE_RATE_API}/${fromCurrency}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
  }

  const data = (await response.json()) as ExchangeRateResponse;
  const rate = data.rates[toCurrency];

  if (rate === undefined) {
    throw new Error(`Exchange rate not found: ${fromCurrency} → ${toCurrency}`);
  }

  // Upsert into cache
  await db.exchangeRateCache.upsert({
    where: {
      fromCurrencyId_toCurrencyId: {
        fromCurrencyId: fromCurrency,
        toCurrencyId: toCurrency,
      },
    },
    update: {
      rate,
      fetchedAt: now,
    },
    create: {
      fromCurrencyId: fromCurrency,
      toCurrencyId: toCurrency,
      rate,
      fetchedAt: now,
    },
  });

  return rate;
}

/**
 * Converts an amount from one currency to another.
 * Returns the converted amount rounded to 2 decimal places.
 */
export async function convertAmount(
  db: PrismaClient,
  amount: number,
  fromCurrency: string,
  toCurrency: string,
): Promise<{ convertedAmount: number; exchangeRate: number }> {
  const exchangeRate = await getExchangeRate(db, fromCurrency, toCurrency);
  const convertedAmount = Math.round(amount * exchangeRate * 100) / 100;
  return { convertedAmount, exchangeRate };
}

/**
 * Ensures a currency exists in our database.
 * Called during company setup to seed the Currency table.
 */
export async function ensureCurrencyExists(
  db: PrismaClient,
  code: string,
  name: string,
  symbol: string,
): Promise<void> {
  await db.currency.upsert({
    where: { id: code },
    update: {},
    create: { id: code, name, symbol },
  });
}
