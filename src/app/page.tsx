import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

/**
 * Root page — redirects based on auth state.
 * Logged in + has company → /dashboard
 * Logged in + no company → /setup
 * Not logged in → /auth/signin
 */
export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (!session.user.companyId) {
    redirect("/setup");
  }

  redirect("/dashboard");
}
