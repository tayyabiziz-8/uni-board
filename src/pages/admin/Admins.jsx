import { useState } from "react";
import { toast } from "sonner";
import { FaUsers, FaPlus, FaSearch, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import StatCard from "../../components/ui/StatCard";
import Modal from "../../components/ui/Modal";
import AdminForm from "../../components/forms/AdminForm";
import useDebounce from "../../hooks/useDebounce";
import { useAdmins, useCreateAdmin, useUpdateAdmin, useDeleteAdmin } from "../../hooks/queries";

const PAGE_SIZE = 10;

function formatDate(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Admins() {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const debouncedQuery = useDebounce(query, 500);

    const { data, isLoading, isError, error } = useAdmins({ page, limit: PAGE_SIZE, search: debouncedQuery });
    const createAdmin = useCreateAdmin();
    const updateAdmin = useUpdateAdmin();
    const deleteAdmin = useDeleteAdmin();

    const admins = data?.data ?? [];
    const total = data?.total ?? data?.meta?.total ?? admins.length;
    const totalPages = data?.totalPages ?? data?.meta?.totalPages ?? Math.max(1, Math.ceil(total / PAGE_SIZE));

    function handleSearchChange(value) {
        setQuery(value);
        setPage(1);
    }

    function openAddModal() {
        setEditingAdmin(null);
        setModalOpen(true);
    }

    function openEditModal(admin) {
        setEditingAdmin(admin);
        setModalOpen(true);
    }

    async function handleSubmit(values, { setSubmitting }) {
        try {
            if (editingAdmin) {
                const payload = { name: values.name, email: values.email };
                if (values.password) payload.password = values.password;
                await updateAdmin.mutateAsync({ id: editingAdmin.id, payload });
                toast.success("Admin updated successfully");
            } else {
                await createAdmin.mutateAsync(values);
                toast.success("Admin added successfully");
            }
            setModalOpen(false);
        } catch (err) {
            toast.error(err.message ?? "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(admin) {
        if (!window.confirm(`Delete ${admin.name}? This can't be undone.`)) return;

        try {
            await deleteAdmin.mutateAsync(admin.id);
            toast.success("Admin deleted");
        } catch (err) {
            toast.error(err.message ?? "Failed to delete admin");
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-(--text-primary)">Admins</h1>
                    <p className="text-(--text-secondary) mt-1">Manage administrator accounts.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) text-sm" />
                        <input
                            value={query}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Search admins..."
                            className="pl-9 pr-4 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent) w-full sm:w-64"
                        />
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 bg-(--accent) hover:bg-(--accent-hover) text-white px-4 py-2.5 rounded-lg transition text-sm font-medium shrink-0"
                    >
                        <FaPlus size={13} />
                        Add Admin
                    </button>
                </div>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <StatCard title="Total Admins" value={isLoading ? "—" : total} subtitle="Reported by API" icon={FaUsers} color="rust" />
                <StatCard title="Current Page" value={`${page} / ${totalPages}`} subtitle={`${PAGE_SIZE} per page`} icon={FaUsers} color="blue" />
            </section>

            <section className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                {isLoading && <div className="py-16 text-center text-(--text-muted) text-sm">Loading admins…</div>}

                {isError && (
                    <div className="py-10 text-center text-red-500 text-sm">
                        Couldn't load admins: {error?.message ?? "unknown error"}.
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-(--border-color) text-left text-(--text-secondary) text-sm">
                                        <th className="py-3 px-4">ID</th>
                                        <th className="py-3 px-4">Name</th>
                                        <th className="py-3 px-4">Email</th>
                                        <th className="py-3 px-4">Created At</th>
                                        <th className="py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins.map((admin) => (
                                        <tr
                                            key={admin.id}
                                            className="border-b border-(--border-color) hover:bg-(--bg-subtle) transition text-(--text-primary)"
                                        >
                                            <td className="px-4 py-4">{admin.id}</td>
                                            <td className="px-4 py-4 font-medium">{admin.name}</td>
                                            <td className="px-4 py-4 text-(--text-secondary)">{admin.email}</td>
                                            <td className="px-4 py-4">{formatDate(admin.created_at)}</td>
                                            <td className="px-4 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openEditModal(admin)}
                                                        className="p-2 rounded-md bg-(--bg-subtle) text-(--text-secondary) hover:text-(--text-primary) transition"
                                                        title="Edit"
                                                    >
                                                        <FaEdit size={13} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(admin)}
                                                        className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-500/15 dark:text-red-400 dark:hover:bg-red-500/25 transition"
                                                        title="Delete"
                                                    >
                                                        <FaTrash size={13} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {admins.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-10 text-center text-(--text-muted)">
                                                No admins found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between mt-5">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page <= 1}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-(--border-color)
                                text-sm text-(--text-secondary) disabled:opacity-40 disabled:cursor-not-allowed hover:bg-(--bg-subtle) transition"
                            >
                                <FaChevronLeft size={11} /> Prev
                            </button>
                            <span className="text-sm text-(--text-muted)">Page {page} of {totalPages}</span>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-(--border-color)
                                text-sm text-(--text-secondary) disabled:opacity-40 disabled:cursor-not-allowed hover:bg-(--bg-subtle) transition"
                            >
                                Next <FaChevronRight size={11} />
                            </button>
                        </div>
                    </>
                )}
            </section>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingAdmin ? "Edit Admin" : "Add Admin"}>
                <AdminForm
                    isEdit={!!editingAdmin}
                    initialValues={editingAdmin ? { name: editingAdmin.name, email: editingAdmin.email, password: "" } : undefined}
                    onSubmit={handleSubmit}
                    onCancel={() => setModalOpen(false)}
                />
            </Modal>
        </div>
    );
}