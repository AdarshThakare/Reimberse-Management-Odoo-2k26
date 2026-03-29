import Image from "next/image";

export default function VerifyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(140deg,#3a46b4_0%,#262f74_58%,#171b47_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#101536_0%,transparent_58%)]" />

      <div className="relative flex min-h-screen flex-col px-6 pt-10 sm:px-12 sm:pt-12">
        <div className="text-[2.1rem] font-extrabold tracking-tight text-white sm:text-[2.3rem]">
          REIM
        </div>

        <div className="flex flex-1 items-end justify-center">
          <div className="animate-fade-in w-full max-w-100 rounded-t-2xl rounded-b-none bg-[#f0f1f5] p-4 shadow-[0_30px_65px_rgba(8,12,45,0.45)] sm:p-7">
            <h1 className="text-[2.1rem] uppercase font-semibold leading-none tracking-tight text-[#101222] sm:text-[2.5rem]">
              Check Your Inbox
            </h1>
            <p className="mt-3 text-sm text-[#5f657f]">
              Your secure magic link is on the way. Click it to finish signing in.
            </p>

            <div className="mt-6 rounded-xl border border-[#d2d5e2] bg-[#e7e8ee] p-3.5">
              <div className="mb-2 flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#4c5272]">
                <span>Email Rocket</span>
                <span>Encrypted Delivery</span>
              </div>

              <div className="mail-rocket-lane relative h-16 overflow-hidden rounded-lg border border-[#d5d7e2] bg-[#eceef4]">
                <div className="animate-mail-rocket absolute left-0 top-1/2 z-10 -translate-y-1/2">
                  <div className="relative pl-2">
                    <span className="animate-mail-flame absolute left-0 top-1/2 h-3 w-14 -translate-y-1/2 rounded-full bg-linear-to-r from-[#57d8ff]/70 via-[#8bf3ff]/60 to-transparent blur-[1px]" />
                    <Image
                      src="/rocket.png"
                      alt="Email rocket"
                      width={170}
                      height={107}
                      priority
                      className="h-11 w-auto max-w-none select-none drop-shadow-[0_7px_10px_rgba(24,44,121,0.35)] rotate-12"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#d2d5e2] bg-[#e7e8ee] p-3.5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#4c5272]">
                Quick Guidelines
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-[#5f657f]">
                <li>Keep this tab open while you check your email.</li>
                <li>Check inbox, spam, and promotions folders.</li>
                <li>If the link expires, go back and request a new one.</li>
              </ul>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 text-xs text-[#676d86]">
              <div className="flex items-center gap-2">
                {/* <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse-dot" /> */}
                Waiting for verification...
              </div>
              <a href="/auth/signin" className="font-semibold text-[#23295f] underline underline-offset-2 transition hover:text-[#101222]">
                Use another email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
