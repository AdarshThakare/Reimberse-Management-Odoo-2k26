"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export function SignInClientPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await signIn("resend", { email, callbackUrl: "/" });
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-4">
      <div className="animate-fade-in w-full max-w-md">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <Image
              src="/logo.png"
              alt="Logo"
              width={56}
              height={56}
            />
          </div>
          <h1 className="text-3xl font-bold text-white">ReimburseFlow</h1>
          <p className="mt-2 text-sm text-brand-200">
            Smart expense management with intelligent approval workflows
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-slate-900">Welcome back</h2>
          <p className="mt-1 text-sm text-slate-500">
            Sign in with your email to continue
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="input"
                autoComplete="email"
                autoFocus
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                  </svg>
                  Sending magic link...
                </>
              ) : (
                "Continue with Email"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            We&apos;ll send you a magic link to sign in instantly.
            <br />No password needed.
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-brand-300">
          First time? A company will be created for you automatically.
        </p>
      </div>
    </div>
  );
}
