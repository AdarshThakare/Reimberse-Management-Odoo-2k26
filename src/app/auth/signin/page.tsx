"use client";

import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

type GsapTimeline = {
  to(target: HTMLElement, vars: Record<string, string | number>): GsapTimeline;
  set(target: HTMLElement, vars: Record<string, string | number>): GsapTimeline;
};

type GsapRuntime = {
  killTweensOf(target: HTMLElement): void;
  timeline(vars: { onComplete?: () => void }): GsapTimeline;
};

declare global {
  interface Window {
    gsap?: GsapRuntime;
  }
}

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const arrowKnobRef = useRef<HTMLSpanElement | null>(null);

  const animateArrow = async () => {
    const knob = arrowKnobRef.current;
    if (!knob || typeof window === "undefined") return;

    const gsap = window.gsap;
    if (!gsap) return;

    gsap.killTweensOf(knob);

    await new Promise<void>((resolve) => {
      gsap
        .timeline({ onComplete: resolve })
        .to(knob, {
          x: 18,
          scale: 1.06,
          duration: 0.11,
          ease: "power3.out",
        })
        .to(knob, {
          x: 38,
          scale: 1,
          duration: 0.1,
          ease: "expo.in",
        })
        .set(knob, { x: -66, scale: 0.92, opacity: 0.9 })
        .to(knob, {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.28,
          ease: "elastic.out(1,0.62)",
        });
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    await animateArrow();

    try {
      await signIn("resend", { email, callbackUrl: "/" });
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(140deg,#3a46b4_0%,#262f74_58%,#171b47_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#101536_0%,transparent_58%)]" />

      <div className="relative flex min-h-screen flex-col px-6 pt-10 sm:px-12 sm:pt-12">
        <div className="text-[2.1rem] font-extrabold tracking-tight text-white sm:text-[2.3rem]">
          REIM
        </div>

        <div className="flex flex-1 items-end justify-center">
          <div className="animate-fade-in w-full max-w-100 rounded-t-2xl rounded-b-none bg-[#f0f1f5] p-4 shadow-[0_30px_65px_rgba(8,12,45,0.45)] sm:p-7">
            <h1 className="text-[2.6rem] uppercase font-semibold leading-none tracking-tight text-[#101222] sm:text-[2.68rem]">
              Welcome Back
            </h1>
            <p className="mt-3 text-sm text-[#5f657f]">
              Sign in using your work email to receive a secure magic link.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#8d8f9b]"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="h-11 w-full rounded-xl border border-transparent bg-[#e3e3e8] px-4 text-sm text-[#1d233d] placeholder:text-[#9da0ac] outline-none transition focus:border-[#27307f]/30 focus:ring-2 focus:ring-[#27307f]/20"
                  autoComplete="email"
                  autoFocus
                />
              </div>

              {error && (
                <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
              )}

              <div className="mt-16 flex items-center gap-2.5">
                <button
                  type="submit"
                  disabled={loading}
                  className="h-12 flex-1 cursor-pointer rounded-full border-2 border-[#11131f] bg-[#f0f1f5] px-5 text-sm font-semibold text-[#11131f] transition hover:bg-[#e7e8ee] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Sending magic link..." : "Continue with Email"}
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Continue"
                  className="group flex h-12 w-20 cursor-pointer items-center justify-end overflow-hidden rounded-full bg-[#1b1d35] px-1 transition hover:bg-[#13162a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span
                    ref={arrowKnobRef}
                    className="will-change-transform flex h-10 w-10 items-center justify-center rounded-full bg-[#d8d9df] text-[#11131f]"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14m-6-6 6 6-6 6"
                      />
                    </svg>
                  </span>
                </button>
              </div>

            
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
