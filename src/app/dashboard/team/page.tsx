"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

const ROLE_BADGE: Record<string, string> = {
  ADMIN: "bg-purple-100 text-purple-700",
  MANAGER: "bg-blue-100 text-blue-700",
  EMPLOYEE: "bg-slate-100 text-slate-700",
};

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

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage employees, roles, and reporting structure
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
          Add Member
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-slate-400">Loading...</div>
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
              {users?.map((user) => (
                <tr key={user.id}>
                  <td className="font-medium text-slate-900">{user.name ?? "—"}</td>
                  <td className="text-slate-500">{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        updateRoleMutation.mutate({
                          userId: user.id,
                          role: e.target.value as "EMPLOYEE" | "MANAGER" | "ADMIN",
                        })
                      }
                      className="rounded border border-slate-200 px-2 py-1 text-xs font-medium"
                    >
                      <option value="EMPLOYEE">Employee</option>
                      <option value="MANAGER">Manager</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>
                  <td className="text-sm text-slate-600">{user.designation ?? "—"}</td>
                  <td>
                    <select
                      value={user.manager?.id ?? ""}
                      onChange={(e) =>
                        assignManagerMutation.mutate({
                          userId: user.id,
                          managerId: e.target.value || null,
                        })
                      }
                      className="rounded border border-slate-200 px-2 py-1 text-xs"
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
                  <td className="text-center">{user._count.expenses}</td>
                  <td>
                    <span className={`badge ${ROLE_BADGE[user.role]}`}>{user.role}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to remove ${user.name || user.email}? They will no longer be able to log in or be assigned as a manager.`)) {
                          api.useUtils().client.user.remove.mutate({ userId: user.id })
                            .then(() => utils.user.list.invalidate())
                            .catch((err) => alert(err.message));
                        }
                      }}
                      className="text-red-600 hover:text-red-800 p-1 bg-red-50 hover:bg-red-100 rounded text-xs font-semibold px-2 transition-colors disabled:opacity-50"
                      disabled={user.email === "manager@test.com" /* wait, the real check is user itself, handled by DB */}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Member Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="animate-fade-in w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-900">Add Team Member</h2>
            <p className="mt-1 text-sm text-slate-500">
              The user will be able to sign in with this email.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
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
