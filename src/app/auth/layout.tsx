"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

type GsapTimeline = {
  to(target: HTMLElement, vars: Record<string, string | number>): GsapTimeline;
};

type GsapRuntime = {
  set(target: HTMLElement, vars: Record<string, string | number>): void;
  killTweensOf(target: HTMLElement): void;
  timeline(vars: { onComplete?: () => void }): GsapTimeline;
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const veilRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const page = pageRef.current;
    const veil = veilRef.current;
    if (!page || !veil || typeof window === "undefined") return;

    const gsap = (window as Window & { gsap?: GsapRuntime }).gsap;
    if (!gsap) return;

    gsap.killTweensOf(page);
    gsap.killTweensOf(veil);

    gsap.set(page, {
      opacity: 0,
      y: 22,
      scale: 0.985,
      filter: "blur(8px)",
    });
    gsap.set(veil, { opacity: 0, xPercent: -8 });

    gsap
      .timeline({})
      .to(veil, {
        opacity: 1,
        xPercent: 0,
        duration: 0.18,
        ease: "power2.out",
      })
      .to(
        page,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power3.out",
        },
      )
      .to(veil, {
        opacity: 0,
        xPercent: 8,
        duration: 0.3,
        ease: "power2.inOut",
      });
  }, [pathname]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"
        strategy="afterInteractive"
      />
      <div
        ref={veilRef}
        className="pointer-events-none fixed inset-0 z-120 opacity-0"
        style={{
          background: "radial-gradient(circle at center, rgba(246, 248, 252, 0.2) 0%, rgba(56, 114, 225, 0.25) 46%, rgba(33, 33, 47, 0.6) 100%)",
        }}
      />
      <div key={pathname} ref={pageRef}>
        {children}
      </div>
    </>
  );
}
