import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { VerifyClientPage } from "./verify-client";

export default async function VerifyPage() {
  const session = await auth();

  if (session?.user) {
    redirect(session.user.companyId ? "/dashboard" : "/setup");
  }

  return <VerifyClientPage />;
}
