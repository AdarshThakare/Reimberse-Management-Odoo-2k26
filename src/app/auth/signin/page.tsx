import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { SignInClientPage } from "./signin-client";

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect(session.user.companyId ? "/dashboard" : "/setup");
  }

  return <SignInClientPage />;
}
