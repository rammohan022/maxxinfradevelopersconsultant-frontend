"use client";

import { useState } from "react";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  UserItem,
  UserRoleType,
} from "@/services/users";
import { UserPlus, Pencil, Trash2, Shield, Users as UsersIcon, CheckCircle, XCircle, Search, Key } from "lucide-react";
import toast from "react-hot-toast";

const ALL_MODULES = [
  { key: "dashboard", label: "Dashboard Analytics" },
  { key: "banners", label: "Hero Banners" },
  { key: "services", label: "Services & Categories" },
  { key: "careers", label: "Careers & Applications" },
  { key: "blogs", label: "Blogs & Categories" },
  { key: "media", label: "Media Library" },
  { key: "leads", label: "Leads & Inquiries" },
  { key: "seo", label: "SEO & Analytics" },
  { key: "settings", label: "Site Settings & Logo" },
  { key: "testimonials", label: "Testimonials" },
  { key: "legal", label: "Legal Policies" },
];

export default function AdminUsersPage() {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "hr" as UserRoleType,
    permissions: ["careers"] as string[],
    isActive: true,
  });

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleRoleChange = (newRole: UserRoleType) => {
    let defaultPerms: string[] = [];
    if (newRole === "admin") {
      defaultPerms = ALL_MODULES.map((m) => m.key);
    } else if (newRole === "hr") {
      defaultPerms = ["careers"];
    } else if (newRole === "editor") {
      defaultPerms = ["blogs"];
    }
    setForm((prev) => ({ ...prev, role: newRole, permissions: defaultPerms }));
  };

  const handlePermissionToggle = (key: string) => {
    setForm((prev) => {
      const exists = prev.permissions.includes(key);
      const updated = exists ? prev.permissions.filter((p) => p !== key) : [...prev.permissions, key];
      return { ...prev, permissions: updated };
    });
  };

  const handleOpenModal = (user?: UserItem) => {
    if (user) {
      setEditingUser(user);
      setForm({
        name: user.name || "",
        email: user.email,
        password: "",
        phoneNumber: user.phoneNumber || "",
        role: user.role,
        permissions: user.permissions || (user.role === "admin" ? ALL_MODULES.map(m => m.key) : user.role === "hr" ? ["careers"] : ["blogs"]),
        isActive: user.isActive,
      });
    } else {
      setEditingUser(null);
      setForm({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "hr",
        permissions: ["careers"],
        isActive: true,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser({
          id: editingUser.id,
          data: {
            name: form.name,
            role: form.role,
            permissions: form.permissions,
            isActive: form.isActive,
            ...(form.password ? { password: form.password } : {}),
          },
        }).unwrap();
        toast.success("User role & permissions updated!");
      } else {
        await createUser({
          name: form.name,
          email: form.email,
          password: form.password,
          phoneNumber: form.phoneNumber,
          role: form.role,
          permissions: form.permissions,
          isActive: form.isActive,
        }).unwrap();
        toast.success("Team member created successfully!");
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save user.");
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to delete user ${email}?`)) return;
    try {
      await deleteUser(id).unwrap();
      toast.success("User removed successfully!");
    } catch (err) {
      toast.error("Failed to remove user.");
    }
  };

  const getRoleBadge = (role: UserRoleType) => {
    switch (role) {
      case "admin":
        return <span className="bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full text-xs font-bold">Admin</span>;
      case "hr":
        return <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold">HR Manager</span>;
      case "editor":
        return <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-bold">Content Writer</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-xs font-bold">Standard User</span>;
    }
  };

  if (isLoading) return <div className="p-4 text-center text-slate-500">Loading team users...</div>;

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">Team & Granular Permissions System</h1>
          <p className="text-sm text-slate-500">Manage team accounts, roles, and module access permissions</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search team users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-secondary w-64"
            />
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition text-sm font-bold shadow"
          >
            <UserPlus size={18} /> Add Team Member
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b text-slate-700 font-bold">
            <tr>
              <th className="p-3 text-left">User Name & Email</th>
              <th className="p-3 text-center">Assigned Role</th>
              <th className="p-3 text-left">Custom Module Permissions</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">
                  No users found matching your search.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-3">
                    <div className="font-bold text-slate-800">{u.name || "Unnamed User"}</div>
                    <div className="text-xs text-slate-500">{u.email}</div>
                  </td>
                  <td className="p-3 text-center">{getRoleBadge(u.role)}</td>
                  <td className="p-3 text-xs text-slate-600">
                    <div className="flex flex-wrap gap-1">
                      {u.role === "admin" ? (
                        <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded font-bold">All Admin Modules</span>
                      ) : (u.permissions && u.permissions.length > 0) ? (
                        u.permissions.map((p) => (
                          <span key={p} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border capitalize">
                            {p}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic">No custom permissions assigned</span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        u.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {u.isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
                      {u.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleOpenModal(u)}
                        className="text-slate-400 hover:text-secondary p-1.5 rounded hover:bg-blue-50"
                        title="Edit Permissions"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(u.id, u.email)}
                        className="text-slate-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl my-auto">
            <h2 className="text-lg font-bold text-slate-800">
              {editingUser ? "Edit Team Member & Permissions" : "Create Team Member Account"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-xs"
                    placeholder="Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    disabled={!!editingUser}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-xs bg-slate-50 disabled:opacity-70"
                    placeholder="rahul@peopleconsultings.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {editingUser ? "New Password (Optional)" : "Password"}
                  </label>
                  <input
                    type="password"
                    required={!editingUser}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-xs"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Role Preset</label>
                  <select
                    value={form.role}
                    onChange={(e) => handleRoleChange(e.target.value as UserRoleType)}
                    className="w-full border rounded-lg px-3 py-2 text-xs bg-white font-medium"
                  >
                    <option value="hr">HR Manager (Careers default)</option>
                    <option value="editor">Content Writer (Blogs default)</option>
                    <option value="admin">Admin (Full Access)</option>
                  </select>
                </div>
              </div>

              {/* Module Permissions Checkbox Grid */}
              <div className="border rounded-xl p-3 bg-slate-50/70 space-y-2">
                <div className="flex justify-between items-center border-b pb-1.5">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                    <Key size={14} className="text-secondary" /> Custom Module Permissions
                  </span>
                  <span className="text-[11px] text-slate-500">Check what this user can manage</span>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto p-1">
                  {ALL_MODULES.map((mod) => {
                    const isChecked = form.permissions.includes(mod.key) || form.role === "admin";
                    return (
                      <label key={mod.key} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:bg-white p-1 rounded border border-transparent hover:border-slate-200">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={form.role === "admin"}
                          onChange={() => handlePermissionToggle(mod.key)}
                          className="rounded text-secondary focus:ring-secondary"
                        />
                        <span>{mod.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-slate-600 border rounded-lg hover:bg-slate-50 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-5 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark text-xs font-bold disabled:opacity-75"
                >
                  {isCreating ? "Saving..." : "Save User & Permissions"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
