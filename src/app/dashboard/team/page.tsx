"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { downloadCsv } from "~/utils/export-csv";

export default function TeamPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "EMPLOYEE" as "EMPLOYEE" | "MANAGER",
    designation: "",
    managerId: "",
  });
  const [error, setError] = useState("");

  const utils = api.useUtils();
  const { data: users, isLoading } = api.user.list.useQuery();
  const { data: managers } = api.user.listManagers.useQuery();

  const createMutation = api.user.create.useMutation({
    onSuccess: () => {
      void utils.user.list.invalidate();
      setShowModal(false);
      setForm({ name: "", email: "", role: "EMPLOYEE", designation: "", managerId: "" });
    },
    onError: (err) => setError(err.message),
  });

  const updateRoleMutation = api.user.updateRole.useMutation({
    onSuccess: () => void utils.user.list.invalidate(),
  });

  const assignManagerMutation = api.user.assignManager.useMutation({
    onSuccess: () => void utils.user.list.invalidate(),
  });

  const removeMutation = api.user.remove.useMutation({
    onSuccess: () => void utils.user.list.invalidate(),
    onError: (err) => alert(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email) {
      setError("Name and email are required.");
      return;
    }
    createMutation.mutate({
      name: form.name,
      email: form.email,
      role: form.role,
      designation: form.designation || undefined,
      managerId: form.managerId || undefined,
    });
  };

  const ROLE_STYLES: Record<string, { bg: string; color: string; border: string }> = {
    ADMIN: { bg: "rgba(139, 92, 246, 0.08)", color: "#8B5CF6", border: "rgba(139, 92, 246, 0.2)" },
    MANAGER: { bg: "rgba(56, 114, 225, 0.08)", color: "#3872E1", border: "rgba(56, 114, 225, 0.2)" },
    EMPLOYEE: { bg: "rgba(156, 160, 184, 0.1)", color: "#6B7194", border: "rgba(156, 160, 184, 0.2)" },
  };

  const handleExportTeam = () => {
    if (!users?.length) return;

    const rows = users.map((user) => [
      user.name ?? "",
      user.email,
      user.role,
      user.designation ?? "",
      user.manager?.name ?? user.manager?.email ?? "",
      user._count.expenses,
    ] as const);

    const dateStamp = new Date().toISOString().slice(0, 10);
    downloadCsv(
      `team-details-${dateStamp}.csv`,
      ["Name", "Email", "Role", "Designation", "Reports To", "Expenses"],
      rows,
    );
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Team Management</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Manage employees, roles, and reporting structure
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportTeam}
            className="btn btn-secondary"
            disabled={!users?.length}
          >
            Export CSV
          </button>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
            Add Member
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-text-muted">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Designation</th>
                <th>Reports To</th>
                <th>Expenses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                const roleStyle = ROLE_STYLES[user.role] ?? ROLE_STYLES.EMPLOYEE!;
                return (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shrink-0"
                          style={{ background: `linear-gradient(135deg, ${roleStyle.color}, ${roleStyle.color}cc)` }}
                        >
                          {user.name?.charAt(0)?.toUpperCase() ?? user.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-text-primary">{user.name ?? "—"}</span>
                      </div>
                    </td>
                    <td className="text-text-secondary">{user.email}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) =>
                          updateRoleMutation.mutate({
                            userId: user.id,
                            role: e.target.value as "EMPLOYEE" | "MANAGER" | "ADMIN",
                          })
                        }
                        className="rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                        style={{
                          background: roleStyle.bg,
                          color: roleStyle.color,
                          border: `1px solid ${roleStyle.border}`,
                        }}
                      >
                        <option value="EMPLOYEE">Employee</option>
                        <option value="MANAGER">Manager</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </td>
                    <td className="text-sm text-text-secondary">{user.designation ?? "—"}</td>
                    <td>
                      <select
                        value={user.manager?.id ?? ""}
                        onChange={(e) =>
                          assignManagerMutation.mutate({
                            userId: user.id,
                            managerId: e.target.value || null,
                          })
                        }
                        className="rounded-lg px-2.5 py-1.5 text-xs cursor-pointer"
                        style={{
                          background: "rgba(33, 33, 47, 0.03)",
                          border: "1px solid rgba(33, 33, 47, 0.08)",
                          color: "#6B7194",
                        }}
                      >
                        <option value="">No manager</option>
                        {managers
                          ?.filter((m) => m.id !== user.id)
                          .map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name ?? m.email}
                              {m.designation ? ` (${m.designation})` : ""}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="text-center font-semibold text-text-primary">{user._count.expenses}</td>
                    <td>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to remove ${user.name ?? user.email}? They will no longer be able to log in or be assigned as a manager.`)) {
                            removeMutation.mutate({ userId: user.id });
                          }
                        }}
                        className="rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer"
                        style={{
                          background: "rgba(239, 68, 68, 0.06)",
                          color: "#EF4444",
                          border: "1px solid rgba(239, 68, 68, 0.15)",
                        }}
                        disabled={user.email === "manager@test.com"}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Member Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(33, 33, 47, 0.6)", backdropFilter: "blur(8px)" }}>
          <div className="animate-scale-in w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl" style={{ border: "1px solid rgba(33, 33, 47, 0.08)" }}>
            <h2 className="text-xl font-bold text-text-primary">Add Team Member</h2>
            <p className="mt-1.5 text-sm text-text-secondary">
              The user will be able to sign in with this email.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="label">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="input"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="input"
                  placeholder="john@company.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Role</label>
                  <select
                    value={form.role}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        role: e.target.value === "MANAGER" ? "MANAGER" : "EMPLOYEE",
                      }))
                    }
                    className="select"
                  >
                    <option value="EMPLOYEE">Employee</option>
                    <option value="MANAGER">Manager</option>
                  </select>
                </div>
                <div>
                  <label className="label">Designation</label>
                  <input
                    value={form.designation}
                    onChange={(e) => setForm((p) => ({ ...p, designation: e.target.value }))}
                    className="input"
                    placeholder="e.g. CFO"
                  />
                </div>
              </div>
              <div>
                <label className="label">Reports To</label>
                <select
                  value={form.managerId}
                  onChange={(e) => setForm((p) => ({ ...p, managerId: e.target.value }))}
                  className="select"
                >
                  <option value="">None</option>
                  {managers?.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name ?? m.email} {m.designation ? `(${m.designation})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="rounded-xl p-3 text-sm font-medium" style={{ background: "rgba(239, 68, 68, 0.06)", color: "#EF4444", border: "1px solid rgba(239, 68, 68, 0.15)" }}>
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={createMutation.isPending} className="btn btn-primary flex-1">
                  {createMutation.isPending ? "Adding..." : "Add Member"}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
