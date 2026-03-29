export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-4">
      <div className="animate-fade-in w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
          <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white">Check your email</h1>
        <p className="mt-3 text-brand-200">
          We&apos;ve sent a magic link to your email address.
          <br />Click the link to sign in.
        </p>

        <div className="mt-8 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3 text-white/80">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span className="text-sm">Waiting for verification...</span>
          </div>
        </div>

        <p className="mt-6 text-xs text-brand-300">
          Didn&apos;t receive it? Check your spam folder or{" "}
          <a href="/auth/signin" className="underline hover:text-white transition-colors">
            try again
          </a>
        </p>
      </div>
    </div>
  );
}
