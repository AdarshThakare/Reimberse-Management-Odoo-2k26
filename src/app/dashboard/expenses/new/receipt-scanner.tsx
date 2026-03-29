"use client";

/**
 * Receipt Scanner Component
 *
 * Provides two modes for capturing receipt images:
 *   1. File upload (drag-and-drop or click to browse)
 *   2. Live camera capture (webcam / mobile camera)
 *
 * After capture, runs Tesseract.js OCR and displays extracted fields.
 * The parent component receives the parsed data via onResult callback.
 */

import { useState, useRef, useCallback, useEffect } from "react";
import {
  extractReceiptData,
  fileToBase64,
  type OcrResult,
} from "./ocr.service";

// ─── Types ───

type ScanMode = "idle" | "upload" | "camera";
type ProcessingState = "idle" | "processing" | "done" | "error";

interface ReceiptScannerProps {
  onResult: (result: OcrResult, base64Image: string) => void;
}

// ─── Component ───

export default function ReceiptScanner({ onResult }: ReceiptScannerProps) {
  const [mode, setMode] = useState<ScanMode>("idle");
  const [processingState, setProcessingState] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [base64Data, setBase64Data] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // ── Camera Helpers ──

  const startCamera = useCallback(async () => {
    setMode("camera");
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setError("Unable to access camera. Please check permissions or use file upload.");
      setMode("idle");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const processImage = useCallback(async (source: File | Blob | string) => {
    setProcessingState("processing");
    setProgress(0);
    setOcrResult(null);
    setError(null);

    try {
      const result = await extractReceiptData(source, (p) => setProgress(p));
      setOcrResult(result);
      setProcessingState("done");
    } catch (err) {
      console.error("OCR Error:", err);
      setError("Failed to process receipt. Please try a clearer image.");
      setProcessingState("error");
    }
  }, []);

  const capturePhoto = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);

    stopCamera();

    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setPreview(dataUrl);
    setBase64Data(dataUrl);
    setMode("upload"); // Switch to upload mode to show preview

    await processImage(dataUrl);
  }, [stopCamera, processImage]);

  // ── File Handling ──

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File too large. Maximum size is 10MB.");
      return;
    }

    setMode("upload");
    setError(null);

    const dataUrl = await fileToBase64(file);
    setPreview(dataUrl);
    setBase64Data(dataUrl);

    await processImage(file);
  }, [processImage]);

  // ── Drag & Drop ──

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        void handleFile(files[0]!);
      }
    },
    [handleFile],
  );

  // ── Apply Result ──

  const handleApply = useCallback(() => {
    if (ocrResult && base64Data) {
      onResult(ocrResult, base64Data);
    }
  }, [ocrResult, base64Data, onResult]);

  // ── Reset ──

  const handleReset = useCallback(() => {
    stopCamera();
    setMode("idle");
    setProcessingState("idle");
    setProgress(0);
    setPreview(null);
    setOcrResult(null);
    setError(null);
    setBase64Data(null);
  }, [stopCamera]);

  // ─── Render ───

  return (
    <div className="card relative overflow-hidden">
      {/* Decorative gradient bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-brand-400 to-emerald-400" />

      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50">
              <svg className="h-5 w-5 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Smart Receipt Scanner</h2>
              <p className="text-xs text-slate-500">Upload or scan a receipt to auto-fill expense details</p>
            </div>
          </div>

          {mode !== "idle" && (
            <button onClick={handleReset} className="btn btn-ghost text-xs" type="button">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reset
            </button>
          )}
        </div>

        {/* ── Idle State: Choose mode ── */}
        {mode === "idle" && (
          <div className="animate-fade-in">
            <div
              className={`relative rounded-xl border-2 border-dashed transition-all duration-200 ${
                isDragging
                  ? "border-brand-400 bg-brand-50/50 scale-[1.01]"
                  : "border-slate-200 bg-slate-50/50 hover:border-brand-300 hover:bg-brand-50/30"
              }`}
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center py-10 px-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 mb-4">
                  <svg className="h-7 w-7 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>

                <p className="text-sm font-medium text-slate-700 mb-1">
                  Drag & drop a receipt image here
                </p>
                <p className="text-xs text-slate-400 mb-5">JPEG, PNG — up to 10MB</p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn btn-primary text-xs"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Browse Files
                  </button>

                  <div className="text-xs text-slate-400">or</div>

                  <button
                    type="button"
                    onClick={() => void startCamera()}
                    className="btn btn-secondary text-xs"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                    </svg>
                    Use Camera
                  </button>
                </div>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleFile(file);
              }}
            />
          </div>
        )}

        {/* ── Camera Mode ── */}
        {mode === "camera" && processingState === "idle" && (
          <div className="animate-fade-in">
            <div className="relative rounded-xl overflow-hidden bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full max-h-[400px] object-cover"
              />

              {/* Camera overlay with viewfinder */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-8 border-2 border-white/30 rounded-xl" />
                <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl-lg" />
                <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-white rounded-tr-lg" />
                <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-white rounded-bl-lg" />
                <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-white rounded-br-lg" />
              </div>

              {/* Capture button */}
              <div className="absolute bottom-4 inset-x-0 flex justify-center">
                <button
                  type="button"
                  onClick={() => void capturePhoto()}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
                >
                  <div className="h-12 w-12 rounded-full border-4 border-brand-600 bg-white hover:bg-brand-50 transition-colors" />
                </button>
              </div>
            </div>

            <p className="text-center text-xs text-slate-500 mt-3">
              Position the receipt within the frame and tap the capture button
            </p>
          </div>
        )}

        {/* ── Processing State ── */}
        {processingState === "processing" && (
          <div className="animate-fade-in">
            <div className="flex flex-col items-center gap-4 py-8">
              {preview && (
                <div className="relative w-full max-w-xs rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={preview} alt="Receipt" className="w-full opacity-70" />
                  <div className="absolute inset-0 bg-brand-600/5 backdrop-blur-[1px]" />
                  {/* Scanning animation overlay */}
                  <div
                    className="absolute left-0 right-0 h-0.5 bg-brand-500 shadow-[0_0_8px_2px_rgba(79,70,229,0.4)]"
                    style={{
                      top: `${progress}%`,
                      transition: "top 0.3s ease-out",
                    }}
                  />
                </div>
              )}

              <div className="w-full max-w-xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">
                    <svg className="inline h-3.5 w-3.5 animate-spin mr-1.5 text-brand-600" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                    </svg>
                    Analyzing receipt...
                  </span>
                  <span className="text-brand-600 font-bold">{progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Results State ── */}
        {processingState === "done" && ocrResult && (
          <div className="animate-fade-in space-y-4">
            {/* Preview + Confidence */}
            <div className="flex gap-4">
              {preview && (
                <div className="w-28 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                  <img src={preview} alt="Receipt" className="w-full object-cover" />
                </div>
              )}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                    <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">Scan Complete</span>
                  <span className="badge bg-emerald-100 text-emerald-700">
                    {Math.round(ocrResult.confidence)}% confidence
                  </span>
                </div>

                {/* Extracted Fields Preview */}
                <div className="grid grid-cols-2 gap-2">
                  <ExtractedField
                    label="Merchant"
                    value={ocrResult.merchantName}
                    icon="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                  />
                  <ExtractedField
                    label="Amount"
                    value={ocrResult.totalAmount ? `${ocrResult.currency ?? ""} ${ocrResult.totalAmount.toFixed(2)}` : null}
                    icon="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <ExtractedField
                    label="Date"
                    value={ocrResult.date}
                    icon="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                  <ExtractedField
                    label="Category"
                    value={ocrResult.suggestedCategory}
                    icon="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                </div>

                {ocrResult.lineItems.length > 0 && (
                  <div className="text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{ocrResult.lineItems.length}</span> line item{ocrResult.lineItems.length !== 1 ? "s" : ""} detected
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleApply}
                className="btn btn-primary flex-1 text-sm"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Apply to Expense Form
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary text-sm"
              >
                Scan Again
              </button>
            </div>
          </div>
        )}

        {/* ── Error State ── */}
        {error && (
          <div className="animate-fade-in mt-3 rounded-lg bg-red-50 border border-red-100 p-3 flex items-start gap-2">
            <svg className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span className="text-sm text-red-600">{error}</span>
          </div>
        )}
      </div>

      {/* Hidden canvas for camera capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

// ─── Sub-components ───

function ExtractedField({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | null;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
      <svg className="h-4 w-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      <div className="min-w-0">
        <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{label}</div>
        <div className={`text-xs truncate ${value ? "font-medium text-slate-800" : "text-slate-400 italic"}`}>
          {value ?? "Not detected"}
        </div>
      </div>
    </div>
  );
}
