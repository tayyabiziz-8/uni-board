import { useState } from "react";
import { FaUsers, FaPlus, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import Modal from "../../components/ui/Modal";
import AddUserForm from "../../components/forms/AddUserForm";
import useDebounce from "../../hooks/useDebounce";
import { useUsersQuery } from "../../hooks/queries";

const PAGE_SIZE = 10;

export default function Users() {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const debouncedQuery = useDebounce(query, 500);

    const { data, isLoading, isError, error, isFetching } = useUsersQuery({
        page,
        limit: PAGE_SIZE,
        search: debouncedQuery,
    });

    function handleSearchChange(value) {
        setQuery(value);
        setPage(1);
    }

    function handleAddUser(values) {
        console.log("New user (not yet persisted):", values);
        setModalOpen(false);
    }

    const users = data?.data ?? [];
    const total = data?.total ?? data?.meta?.total ?? users.length;
    const totalPages = data?.totalPages ?? data?.meta?.totalPages ?? Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-(--text-primary)">Manage Users</h1>
                    <p className="text-(--text-secondary) mt-1">All students, teachers and admins on the portal.</p>
                </div>

                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 bg-(--accent) hover:bg-(--accent-hover) text-white px-4 py-2.5 rounded-lg transition text-sm font-medium shrink-0"
                >
                    <FaPlus size={13} />
                    Add User
                </button>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <StatCard title="Total Users" value={isLoading ? "—" : total} subtitle="Reported by API" icon={FaUsers} color="rust" />
                <StatCard title="Current Page" value={`${page} / ${totalPages}`} subtitle={`${PAGE_SIZE} per page`} icon={FaUsers} color="blue" />
                <StatCard title="Loaded Now" value={users.length} subtitle="Rows on this page" icon={FaUsers} color="amber" />
            </section>

            <section className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                    <h2 className="text-xl font-semibold text-(--text-primary)">
                        All Users
                        {isFetching && !isLoading && (
                            <span className="text-xs font-normal text-(--text-muted) ml-2">updating…</span>
                        )}
                    </h2>

                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) text-sm" />
                        <input
                            value={query}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Search by name or email..."
                            className="pl-9 pr-4 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent) w-full md:w-72"
                        />
                    </div>
                </div>

                {isLoading && (
                    <div className="py-16 text-center text-(--text-muted) text-sm">Loading users…</div>
                )}

                {isError && (
                    <div className="py-10 text-center text-red-500 text-sm">
                        Couldn't load users: {error?.message ?? "unknown error"}.
                        {" "}Check that a valid token is in <code>localStorage.token</code>.
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-(--border-color) text-left text-(--text-secondary) text-sm">
                                        <th className="py-3 px-4">Name</th>
                                        <th className="py-3 px-4">Email</th>
                                        <th className="py-3 px-4">Phone</th>
                                        <th className="py-3 px-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u, i) => (
                                        <tr
                                            key={u.id ?? u._id ?? i}
                                            className="border-b border-(--border-color) hover:bg-(--bg-subtle) transition text-(--text-primary)"
                                        >
                                            <td className="px-4 py-4 font-medium">
                                                {[u.firstName, u.lastName].filter(Boolean).join(" ") || "—"}
                                            </td>
                                            <td className="px-4 py-4 text-(--text-secondary)">{u.email ?? "—"}</td>
                                            <td className="px-4 py-4 text-(--text-secondary)">{u.phone || "—"}</td>
                                            <td className="px-4 py-4">
                                                <StatusBadge status={u.status ?? "Active"} />
                                            </td>
                                        </tr>
                                    ))}

                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-10 text-center text-(--text-muted)">
                                                No users match your search.
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
                                text-sm text-(--text-secondary) disabled:opacity-40 disabled:cursor-not-allowed hover:bg-r(--bg-subtle) transition"
                            >
                                Next <FaChevronRight size={11} />
                            </button>
                        </div>

                        <details className="mt-6 text-xs text-(--text-muted)">
                            <summary className="cursor-pointer select-none">Raw API response (debug)</summary>
                            <pre className="mt-2 p-3 rounded-lg bg-(--bg-app) border border-(--border-color) overflow-x-auto">
                                {JSON.stringify(data, null, 2)}
                            </pre>
                        </details>
                    </>
                )}
            </section>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add User">
                <AddUserForm onSubmit={handleAddUser} onCancel={() => setModalOpen(false)} />
            </Modal>
        </div>
    );
}