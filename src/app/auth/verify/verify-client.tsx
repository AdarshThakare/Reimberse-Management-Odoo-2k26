"use client";

import Image from "next/image";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function VerifyClientPage() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    let attempts = 0;
    const pollIntervalMs = 5000;
    const maxPollingAttempts = 18;

    const checkSessionAndRedirect = async () => {
      const session = await getSession();
      if (!isMounted || !session?.user) return;

      if (session.user.companyId) {
        router.replace("/dashboard");
      } else {
        router.replace("/setup");
      }
    };

    const intervalId = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      attempts += 1;
      if (attempts > maxPollingAttempts) {
        window.clearInterval(intervalId);
        return;
      }
      void checkSessionAndRedirect();
    }, pollIntervalMs);

    const onFocus = () => { attempts = 0; };
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") attempts = 0;
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [router]);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(140deg, #3872E1 0%, #21212F 58%, #1a1a28 100%)" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at bottom, #1a1a28 0%, transparent 58%)" }} />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Floating orbs */}
      <div className="absolute top-32 right-[20%] h-64 w-64 rounded-full animate-float opacity-20" style={{ background: "radial-gradient(circle, rgba(0, 221, 176, 0.4), transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative flex min-h-screen flex-col px-6 pt-10 sm:px-12 sm:pt-12">
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
            <h1 className="text-[2.1rem] uppercase font-semibold leading-none tracking-tight sm:text-[2.5rem]" style={{ color: "#21212F" }}>
              Check Your Inbox
            </h1>
            <p className="mt-3 text-sm" style={{ color: "#6B7194" }}>
              Your secure magic link is on the way. Click it to finish signing in.
            </p>

            <div className="mt-6 rounded-xl p-3.5" style={{
              background: "#ECE9EA",
              border: "1px solid rgba(33, 33, 47, 0.08)",
            }}>
              <div className="mb-2 flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.08em]" style={{ color: "#6B7194" }}>
                <span>Email Rocket</span>
                <span>Encrypted Delivery</span>
              </div>

              <div className="mail-rocket-lane relative h-16 overflow-hidden rounded-lg" style={{
                background: "#F6F8FC",
                border: "1px solid rgba(33, 33, 47, 0.06)",
              }}>
                <div className="animate-mail-rocket absolute left-0 top-1/2 z-10 -translate-y-1/2">
                  <div className="relative pl-2">
                    <span className="animate-mail-flame absolute left-0 top-1/2 h-3 w-14 -translate-y-1/2 rounded-full bg-linear-to-r from-[#3872E1]/60 via-[#00DDB0]/50 to-transparent blur-[1px]" />
                    <Image
                      src="/rocket.png"
                      alt="Email rocket"
                      width={170}
                      height={107}
                      priority
                      className="h-11 w-auto max-w-none select-none drop-shadow-[0_7px_10px_rgba(33,33,47,0.35)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl p-3.5" style={{
              background: "#ECE9EA",
              border: "1px solid rgba(33, 33, 47, 0.08)",
            }}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.08em]" style={{ color: "#6B7194" }}>
                Quick Guidelines
              </p>
              <ul className="mt-2 space-y-1.5 text-xs" style={{ color: "#6B7194" }}>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full" style={{ background: "#00DDB0" }} />
                  Keep this tab open while you check your email.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full" style={{ background: "#00DDB0" }} />
                  Check inbox, spam, and promotions folders.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full" style={{ background: "#00DDB0" }} />
                  If the link expires, go back and request a new one.
                </li>
              </ul>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 text-xs" style={{ color: "#6B7194" }}>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full animate-pulse-dot" style={{ background: "#00DDB0", boxShadow: "0 0 6px rgba(0, 221, 176, 0.5)" }} />
                Waiting for verification...
              </div>
              <a
                href="/auth/signin"
                className="font-semibold underline underline-offset-2 transition hover:opacity-80"
                style={{ color: "#3872E1" }}
              >
                Use another email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
