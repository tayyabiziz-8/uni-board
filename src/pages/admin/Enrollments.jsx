import { useState } from "react";
import { toast } from "sonner";
import { FaPlus, FaSearch, FaDownload, FaSync, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Modal from "../../components/ui/Modal";
import AddEnrollmentForm from "../../components/forms/AddEnrollmentForm";
import useDebounce from "../../hooks/useDebounce";
import { useEnrollments, useCreateEnrollment } from "../../hooks/queries";
import { useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 25;

const FILTERS = ["Coupon", "Organization Level 1", "Organization Level 2", "Organization Level 3", "Charisms by Color", "Identity by Color"];

export default function Enrollments() {
    const queryClient = useQueryClient();
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const debouncedQuery = useDebounce(query, 500);

    const { data, isLoading, isError, error, isFetching } = useEnrollments({ page, limit: PAGE_SIZE, search: debouncedQuery });
    const createEnrollment = useCreateEnrollment();

    const enrollments = data?.data ?? [];
    const total = data?.total ?? data?.meta?.total ?? enrollments.length;
    const totalPages = data?.totalPages ?? data?.meta?.totalPages ?? Math.max(1, Math.ceil(total / PAGE_SIZE));

    function handleSearchChange(value) {
        setQuery(value);
        setPage(1);
    }

    function handleRefresh() {
        queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    }

    function handleExport() {
        toast.info("Export isn't wired up to a real endpoint yet");
    }

    async function handleAddEnrollment(values, { setSubmitting, resetForm }) {
        try {
            await createEnrollment.mutateAsync(values);
            toast.success("Enrollment added successfully");
            resetForm();
            setModalOpen(false);
        } catch (err) {
            toast.error(err.message ?? "Failed to add enrollment");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <h1 className="text-3xl font-bold text-(--text-primary)">Enrollments</h1>

                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) text-sm" />
                        <input
                            value={query}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Search by email or name..."
                            className="pl-9 pr-4 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent) w-full sm:w-72"
                        />
                    </div>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="flex items-center gap-2 bg-(--accent) hover:bg-(--accent-hover) text-white px-4 py-2.5 rounded-lg transition text-sm font-medium"
                    >
                        <FaPlus size={13} />
                        Add Enrollment
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 border border-(--border-color) text-(--text-primary) hover:bg-(--bg-subtle) px-4 py-2.5 rounded-lg transition text-sm font-medium"
                    >
                        <FaDownload size={13} />
                        Export Current Settings
                    </button>
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 border border-(--border-color) text-(--text-primary) hover:bg-(--bg-subtle) px-4 py-2.5 rounded-lg transition text-sm font-medium"
                    >
                        <FaSync size={13} className={isFetching ? "animate-spin" : ""} />
                        Refresh
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                {FILTERS.map((f) => (
                    <select
                        key={f}
                        defaultValue={f}
                        className="px-3 py-2 rounded-lg border border-(--border-color) bg-(--bg-card)
                        text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                    >
                        <option>{f}</option>
                    </select>
                ))}
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-(--border-color) bg-(--bg-card)
                    text-(--text-primary) hover:bg-(--bg-subtle) transition text-sm font-medium"
                >
                    <FaDownload size={13} />
                    Export Enrollments
                </button>
            </div>

            <section className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                {isLoading && <div className="py-16 text-center text-(--text-muted) text-sm">Loading enrollments…</div>}

                {isError && (
                    <div className="py-10 text-center text-red-500 text-sm">
                        Couldn't load enrollments: {error?.message ?? "unknown error"}.
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-(--border-color) text-left text-(--text-secondary) text-sm">
                                        <th className="py-3 px-4">ID</th>
                                        <th className="py-3 px-4">Student ID</th>
                                        <th className="py-3 px-4">First Name</th>
                                        <th className="py-3 px-4">Last Name</th>
                                        <th className="py-3 px-4">Email</th>
                                        <th className="py-3 px-4">Product Type</th>
                                        <th className="py-3 px-4">Product Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrollments.map((e, i) => (
                                        <tr
                                            key={e.id ?? i}
                                            className="border-b border-(--border-color) hover:bg-(--bg-subtle) transition text-(--text-primary)"
                                        >
                                            <td className="px-4 py-4">{e.id}</td>
                                            <td className="px-4 py-4">{e.student_id ?? "—"}</td>
                                            <td className="px-4 py-4 font-medium">{e.first_name ?? "—"}</td>
                                            <td className="px-4 py-4">{e.last_name ?? "—"}</td>
                                            <td className="px-4 py-4 text-(--text-secondary)">{e.email ?? "—"}</td>
                                            <td className="px-4 py-4">{e.product_type ?? "—"}</td>
                                            <td className="px-4 py-4 max-w-xs truncate" title={e.product_name}>{e.product_name ?? "—"}</td>
                                        </tr>
                                    ))}

                                    {enrollments.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-10 text-center text-(--text-muted)">
                                                No enrollments match your search.
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

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Enrollment">
                <AddEnrollmentForm onSubmit={handleAddEnrollment} onCancel={() => setModalOpen(false)} />
            </Modal>
        </div>
    );
}