import { useState, useMemo } from "react";
import { toast } from "sonner";
import { FaSearch, FaPlus, FaSync, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Modal from "../../components/ui/Modal";
import AddQuestionForm from "../../components/forms/AddQuestionForm";
import StatusBadge from "../../components/ui/StatusBadge";
import useDebounce from "../../hooks/useDebounce";
import { useQuestions, useCreateQuestion, useUpdateQuestion, useDeleteQuestion } from "../../hooks/queries";
import { useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 25;

function formatDate(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Questions() {
    const queryClient = useQueryClient();
    const [query, setQuery] = useState("");
    const [ageFilter, setAgeFilter] = useState("all");
    const [charismFilter, setCharismFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const debouncedQuery = useDebounce(query, 500);

    const { data, isLoading, isError, error, isFetching } = useQuestions({
        page,
        limit: PAGE_SIZE,
        search: debouncedQuery,
    });
    const createQuestion = useCreateQuestion();
    const updateQuestion = useUpdateQuestion();
    const deleteQuestion = useDeleteQuestion();

    const questions = data?.data ?? [];
    const total = data?.total ?? data?.meta?.total ?? questions.length;
    const totalPages = data?.totalPages ?? data?.meta?.totalPages ?? Math.max(1, Math.ceil(total / PAGE_SIZE));

    const ageOptions = useMemo(() => [...new Set(questions.map((q) => q.age_group).filter(Boolean))], [questions]);
    // charism is a nested object ({id, name, description, ...}), not a
    // string — dedupe/filter on .name specifically.
    const charismOptions = useMemo(
        () => [...new Set(questions.map((q) => q.charism?.name).filter(Boolean))],
        [questions]
    );

    const filtered = questions.filter((q) => {
        const matchesAge = ageFilter === "all" || q.age_group === ageFilter;
        const matchesCharism = charismFilter === "all" || q.charism?.name === charismFilter;
        return matchesAge && matchesCharism;
    });

    function handleSearchChange(value) {
        setQuery(value);
        setPage(1);
    }

    function handleRefresh() {
        queryClient.invalidateQueries({ queryKey: ["questions"] });
    }

    function openAddModal() {
        setEditingQuestion(null);
        setModalOpen(true);
    }

    function openEditModal(question) {
        setEditingQuestion(question);
        setModalOpen(true);
    }

    async function handleSubmit(values, { setSubmitting }) {
        try {
            if (editingQuestion) {
                await updateQuestion.mutateAsync({ id: editingQuestion.id, payload: values });
                toast.success("Question updated successfully");
            } else {
                await createQuestion.mutateAsync(values);
                toast.success("Question added successfully");
            }
            setModalOpen(false);
        } catch (err) {
            toast.error(err.message ?? "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(question) {
        if (!window.confirm("Delete this question? This can't be undone.")) return;

        try {
            await deleteQuestion.mutateAsync(question.id);
            toast.success("Question deleted");
        } catch (err) {
            toast.error(err.message ?? "Failed to delete question");
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">Questions</h1>

                <div className="flex flex-wrap gap-3">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-sm" />
                        <input
                            value={query}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Search question text..."
                            className="pl-9 pr-4 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)]
                            text-[var(--text-primary)] text-sm outline-none focus:ring-2 focus:ring-[var(--accent)] w-full sm:w-64"
                        />
                    </div>

                    <select
                        value={ageFilter}
                        onChange={(e) => setAgeFilter(e.target.value)}
                        className="px-3 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    >
                        <option value="all">All Ages</option>
                        {ageOptions.map((a) => (
                            <option key={a} value={a}>{a[0].toUpperCase() + a.slice(1)}</option>
                        ))}
                    </select>

                    <select
                        value={charismFilter}
                        onChange={(e) => setCharismFilter(e.target.value)}
                        className="px-3 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    >
                        <option value="all">All Charisms</option>
                        {charismOptions.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2.5 rounded-lg transition text-sm font-medium"
                    >
                        <FaSync size={13} className={isFetching ? "animate-spin" : ""} /> Refresh
                    </button>
                </div>
            </div>

            <button
                onClick={openAddModal}
                className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-2.5 rounded-lg transition text-sm font-medium w-fit"
            >
                <FaPlus size={13} /> Add Question
            </button>

            <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-sm p-5">
                {isLoading && <div className="py-16 text-center text-[var(--text-muted)] text-sm">Loading questions…</div>}

                {isError && (
                    <div className="py-10 text-center text-red-500 text-sm">
                        Couldn't load questions: {error?.message ?? "unknown error"}.
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-[var(--border-color)] text-left text-[var(--text-secondary)] text-sm">
                                        <th className="py-3 px-4">ID</th>
                                        <th className="py-3 px-4">Question</th>
                                        <th className="py-3 px-4">Age Group</th>
                                        <th className="py-3 px-4">Charism</th>
                                        <th className="py-3 px-4">Active</th>
                                        <th className="py-3 px-4">Created At</th>
                                        <th className="py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((q) => (
                                        <tr
                                            key={q.id}
                                            className="border-b border-[var(--border-color)] hover:bg-[var(--bg-subtle)] transition text-[var(--text-primary)] align-top"
                                        >
                                            <td className="px-4 py-4">{q.id}</td>
                                            <td className="px-4 py-4 max-w-md">{q.question}</td>
                                            <td className="px-4 py-4 capitalize">{q.age_group ?? "—"}</td>
                                            <td className="px-4 py-4">{q.charism?.name ?? "—"}</td>
                                            <td className="px-4 py-4">
                                                <StatusBadge status={q.active ? "Active" : "Inactive"} />
                                            </td>
                                            <td className="px-4 py-4">{formatDate(q.created_at)}</td>
                                            <td className="px-4 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openEditModal(q)}
                                                        className="p-2 rounded-md bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
                                                        title="Edit"
                                                    >
                                                        <FaEdit size={13} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(q)}
                                                        className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-500/15 dark:text-red-400 dark:hover:bg-red-500/25 transition"
                                                        title="Delete"
                                                    >
                                                        <FaTrash size={13} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-10 text-center text-[var(--text-muted)]">
                                                No questions match your filters.
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
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border-color)]
                                text-sm text-[var(--text-secondary)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--bg-subtle)] transition"
                            >
                                <FaChevronLeft size={11} /> Prev
                            </button>
                            <span className="text-sm text-[var(--text-muted)]">Page {page} of {totalPages}</span>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border-color)]
                                text-sm text-[var(--text-secondary)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--bg-subtle)] transition"
                            >
                                Next <FaChevronRight size={11} />
                            </button>
                        </div>
                    </>
                )}
            </section>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingQuestion ? "Edit Question" : "Add Question"}>
                <AddQuestionForm
                    isEdit={!!editingQuestion}
                    initialValues={
                        editingQuestion
                            ? {
                                  question: editingQuestion.question ?? "",
                                  question_spanish: editingQuestion.question_spanish ?? "",
                                  age_group: editingQuestion.age_group ?? "adult",
                                  charism: editingQuestion.charism ?? "",
                                  active: editingQuestion.active ?? true,
                              }
                            : undefined
                    }
                    onSubmit={handleSubmit}
                    onCancel={() => setModalOpen(false)}
                />
            </Modal>
        </div>
    );
}