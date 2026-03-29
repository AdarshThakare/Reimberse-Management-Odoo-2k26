"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
    roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
  },
  {
    label: "My Expenses",
    href: "/dashboard/expenses",
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
    roles: ["MANAGER", "EMPLOYEE"],
  },
  {
    label: "Expense History",
    href: "/dashboard/expenses/history",
    icon: "M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z",
    roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
  },
  {
    label: "Approvals",
    href: "/dashboard/approvals",
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    roles: ["ADMIN", "MANAGER"],
  },
  {
    label: "Team",
    href: "/dashboard/team",
    icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
    roles: ["ADMIN"],
  },
  {
    label: "Approval Rules",
    href: "/dashboard/rules",
    icon: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75",
    roles: ["ADMIN"],
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z",
    roles: ["ADMIN"],
  },
];

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrator",
  MANAGER: "Manager",
  EMPLOYEE: "Employee",
};

export function DashboardShell({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const role = session.user.role;

  const visibleNav = NAV_ITEMS.filter((item) =>
    item.roles.includes(role),
  );

  const initials =
    session.user.name?.charAt(0)?.toUpperCase() ??
    session.user.email?.charAt(0)?.toUpperCase() ??
    "U";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Sidebar ── */}
      <aside
        className="flex w-[272px] flex-col"
        style={{
          background: "linear-gradient(180deg, #21212F 0%, #1a1a28 100%)",
        }}
      >
        {/* Brand */}
        <div className="flex h-[72px] items-center gap-3 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
            />
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 30%, #00DDB0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            REIM
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B7194]">
            Menu
          </div>
          {visibleNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200"
                style={
                  isActive
                    ? {
                        background: "rgba(56, 114, 225, 0.12)",
                        color: "#ffffff",
                      }
                    : {
                        color: "#9CA0B8",
                      }
                }
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full"
                    style={{
                      background: "linear-gradient(180deg, #3872E1, #00DDB0)",
                      boxShadow: "0 0 8px rgba(0, 221, 176, 0.4)",
                    }}
                  />
                )}
                <svg
                  className="h-5 w-5 transition-colors duration-200"
                  style={{
                    color: isActive ? "#3872E1" : "#6B7194",
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className={isActive ? "" : "group-hover:text-white"}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div
          className="mx-3 mb-4 rounded-xl p-4"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #3872E1, #00DDB0)",
                  boxShadow: "0 4px 12px rgba(56, 114, 225, 0.3)",
                }}
              >
                {initials}
              </div>
              {/* Online dot */}
              <div
                className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full animate-pulse-dot"
                style={{
                  background: "#00DDB0",
                  border: "2.5px solid #21212F",
                  boxShadow: "0 0 6px rgba(0, 221, 176, 0.5)",
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate text-sm font-semibold text-white">
                {session.user.name ?? session.user.email}
              </div>
              <div
                className="mt-0.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  background: "rgba(0, 221, 176, 0.12)",
                  color: "#00DDB0",
                }}
              >
                {session.user.designation ?? ROLE_LABELS[role] ?? role}
              </div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all duration-200 cursor-pointer"
            style={{
              color: "#9CA0B8",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
              e.currentTarget.style.color = "#EF4444";
              e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
              e.currentTarget.style.color = "#9CA0B8";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
            }}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto bg-surface-page">
        <div className="p-8 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
