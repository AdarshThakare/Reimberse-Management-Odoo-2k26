import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "./_components/dashboard-shell";
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (!session.user.companyId) {
    redirect("/setup");
  }

  return (
    <SessionProvider session={session}>
      <DashboardShell session={session}>{children}</DashboardShell>
    </SessionProvider>
  );
}
