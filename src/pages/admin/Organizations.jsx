import { useState, useMemo } from "react";
import { toast } from "sonner";
import { FaBuilding, FaSearch, FaPlus, FaSync, FaDownload, FaLayerGroup } from "react-icons/fa";
import Modal from "../../components/ui/Modal";
import AddOrganizationForm from "../../components/forms/AddOrganizationForm";
import { useOrganizations, useCreateOrganization, useUpdateStewardshipRenewal, useUpdateChatbotAccess } from "../../hooks/queries";
import { useQueryClient } from "@tanstack/react-query";

function ToggleSwitch({ checked, onChange }) {
    return (
        <button
            onClick={onChange}
            className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${checked ? "bg-(--accent)" : "bg-(--border-strong)"}`}
        >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} />
        </button>
    );
}

export default function Organizations() {
    const queryClient = useQueryClient();
    const [query, setQuery] = useState("");
    const [levelFilter, setLevelFilter] = useState("all");
    const [modalOpen, setModalOpen] = useState(false);

    const { data, isLoading, isError, error, isFetching } = useOrganizations();
    const createOrganization = useCreateOrganization();
    const updateStewardship = useUpdateStewardshipRenewal();
    const updateChatbot = useUpdateChatbotAccess();
    const orgs = data?.data ?? (Array.isArray(data) ? data : []);

    const filtered = useMemo(() => {
        return orgs.filter((o) => {
            const matchesQuery = (o.name ?? "").toLowerCase().includes(query.toLowerCase());
            const matchesLevel = levelFilter === "all" || String(o.level) === levelFilter;
            return matchesQuery && matchesLevel;
        });
    }, [orgs, query, levelFilter]);

    function handleRefresh() {
        queryClient.invalidateQueries({ queryKey: ["organizations"] });
    }

    function handleExport() {
        toast.info("Export isn't wired up to a real endpoint yet");
    }

    function handleMerge() {
        toast.info("Merge Level 2 Orgs isn't wired up to a real endpoint yet");
    }

    async function handleAddOrganization(values, { setSubmitting, resetForm }) {
        try {
            await createOrganization.mutateAsync(values);
            toast.success("Organization added successfully");
            resetForm();
            setModalOpen(false);
        } catch (err) {
            toast.error(err.message ?? "Failed to add organization");
        } finally {
            setSubmitting(false);
        }
    }

    async function toggleChatbot(org) {
        try {
            await updateChatbot.mutateAsync({ id: org.id, enabled: !org.chatbot_access_enabled });
            toast.success(`Chatbot access ${!org.chatbot_access_enabled ? "enabled" : "disabled"} for ${org.name}`);
        } catch (err) {
            toast.error(err.message ?? "Failed to update chatbot access");
        }
    }

    async function toggleStewardship(org) {
        try {
            await updateStewardship.mutateAsync({ id: org.id, enabled: !org.stewardship_renewal_enabled });
            toast.success(`Stewardship renewal ${!org.stewardship_renewal_enabled ? "enabled" : "disabled"} for ${org.name}`);
        } catch (err) {
            toast.error(err.message ?? "Failed to update stewardship renewal");
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <FaBuilding className="text-(--accent)" />
                        <h1 className="text-2xl font-bold tracking-wide text-(--text-primary) uppercase">Organizations</h1>
                    </div>
                    <p className="text-(--text-secondary) mt-1">Manage your organization hierarchy and levels.</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 border border-(--border-color) text-(--text-primary) hover:bg-(--bg-subtle) px-4 py-2.5 rounded-lg transition text-sm font-medium"
                    >
                        <FaSync size={13} className={isFetching ? "animate-spin" : ""} /> Refresh
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 bg-(--accent) hover:bg-(--accent-hover) text-white px-4 py-2.5 rounded-lg transition text-sm font-medium"
                    >
                        <FaDownload size={13} /> Export
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-55">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) text-sm" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by organization name..."
                        className="pl-9 pr-4 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-card) text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent) w-full"
                    />
                </div>

                <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="px-3 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-card) text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                >
                    <option value="all">Filter by Level</option>
                    <option value="1">Level 1</option>
                    <option value="2">Level 2</option>
                    <option value="3">Level 3</option>
                </select>

                <button
                    onClick={handleMerge}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-card) text-(--text-primary) hover:bg-(--bg-subtle) transition text-sm font-medium"
                >
                    <FaLayerGroup size={13} /> Merge Level 2 Orgs
                </button>

                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 bg-(--accent) hover:bg-(--accent-hover) text-white px-4 py-2.5 rounded-lg transition text-sm font-medium"
                >
                    <FaPlus size={13} /> Add Organization
                </button>
            </div>

            <section className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                {isLoading && <div className="py-16 text-center text-(--text-muted) text-sm">Loading organizations…</div>}

                {isError && (
                    <div className="py-10 text-center text-red-500 text-sm">
                        Couldn't load organizations: {error?.message ?? "unknown error"}.
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        <div className="overflow-x-auto max-h-130 overflow-y-auto">
                            <table className="min-w-full">
                                <thead className="sticky top-0 bg-(--bg-card)">
                                    <tr className="border-b border-(--border-color) text-left text-(--text-secondary) text-sm">
                                        <th className="py-3 px-4">ID</th>
                                        <th className="py-3 px-4">Organization Name</th>
                                        <th className="py-3 px-4">Level</th>
                                        <th className="py-3 px-4">Parent Organization</th>
                                        <th className="py-3 px-4">Chatbot Access</th>
                                        <th className="py-3 px-4">Stewardship Renewal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((org) => (
                                        <tr
                                            key={org.id}
                                            className="border-b border-(--border-color) hover:bg-(--bg-subtle) transition text-(--text-primary)"
                                        >
                                            <td className="px-4 py-4">{org.id}</td>
                                            <td className="px-4 py-4 font-medium">{org.name ?? "—"}</td>
                                            <td className="px-4 py-4">{org.level ?? "—"}</td>
                                            <td className="px-4 py-4 text-(--text-secondary)">{org.parent_organization ?? org.parent_name ?? "—"}</td>
                                            <td className="px-4 py-4">
                                                <ToggleSwitch checked={!!org.chatbot_access_enabled} onChange={() => toggleChatbot(org)} />
                                            </td>
                                            <td className="px-4 py-4">
                                                <ToggleSwitch checked={!!org.stewardship_renewal_enabled} onChange={() => toggleStewardship(org)} />
                                            </td>
                                        </tr>
                                    ))}

                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-10 text-center text-(--text-muted)">
                                                No organizations match your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <details className="mt-6 text-xs text-(--text-muted)">
                            <summary className="cursor-pointer select-none">Raw API response (debug)</summary>
                            <pre className="mt-2 p-3 rounded-lg bg-(--bg-app) border border-(--border-color) overflow-x-auto max-h-64 overflow-y-auto">
                                {JSON.stringify(data, null, 2)}
                            </pre>
                        </details>
                    </>
                )}
            </section>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Organization">
                <AddOrganizationForm onSubmit={handleAddOrganization} onCancel={() => setModalOpen(false)} />
            </Modal>
        </div>
    );
}