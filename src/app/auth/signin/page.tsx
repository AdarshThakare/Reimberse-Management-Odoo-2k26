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
    <div className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(140deg, #3872E1 0%, #21212F 58%, #1a1a28 100%)" }}>
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at bottom, #1a1a28 0%, transparent 58%)" }} />

      {/* Dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Floating orbs */}
      <div className="absolute top-20 left-[15%] h-72 w-72 rounded-full animate-float opacity-20" style={{ background: "radial-gradient(circle, rgba(56, 114, 225, 0.4), transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-40 right-[10%] h-56 w-56 rounded-full animate-float opacity-15" style={{ background: "radial-gradient(circle, rgba(0, 221, 176, 0.3), transparent 70%)", filter: "blur(40px)", animationDelay: "2s" }} />

      <div className="relative flex min-h-screen flex-col px-6 pt-10 sm:px-12 sm:pt-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg, #3872E1, #00DDB0)",
              boxShadow: "0 4px 14px rgba(56, 114, 225, 0.3)",
            }}
          >
            <svg className="h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-[1.6rem] font-extrabold tracking-tight text-white">REIM</span>
        </div>

        <div className="flex flex-1 items-end justify-center">
          <div
            className="animate-fade-in w-full max-w-100 rounded-t-2xl rounded-b-none p-4 sm:p-7"
            style={{
              background: "#F6F8FC",
              boxShadow: "0 -30px 65px rgba(33, 33, 47, 0.45)",
            }}
          >
            <h1 className="text-[2.6rem] uppercase font-semibold leading-none tracking-tight sm:text-[2.68rem]" style={{ color: "#21212F" }}>
              Welcome Back
            </h1>
            <p className="mt-3 text-sm" style={{ color: "#6B7194" }}>
              Sign in using your work email to receive a secure magic link.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                  style={{ color: "#9CA0B8" }}
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="h-12 w-full rounded-xl border border-transparent px-4 text-sm outline-none transition focus:ring-2 focus:ring-[rgba(56,114,225,0.2)] focus:border-[#3872E1]"
                  style={{
                    background: "#ECE9EA",
                    color: "#21212F",
                  }}
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
                  className="h-12 flex-1 cursor-pointer rounded-full px-5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    background: "#F6F8FC",
                    color: "#21212F",
                    border: "2px solid #21212F",
                  }}
                >
                  {loading ? "Sending magic link..." : "Continue with Email"}
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Continue"
                  className="group flex h-12 w-20 cursor-pointer items-center justify-end overflow-hidden rounded-full px-1 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg, #21212F, #2a2a3d)",
                  }}
                >
                  <span
                    ref={arrowKnobRef}
                    className="will-change-transform flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: "#ECE9EA", color: "#21212F" }}
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
