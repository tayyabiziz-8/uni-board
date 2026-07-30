import { useState, useMemo } from "react";
import { toast } from "sonner";
import { FaClipboardList, FaSearch, FaSync, FaCheck, FaTimes } from "react-icons/fa";
import { useStewardshipRenewalAccess, useUpdateStewardshipRenewal } from "../../hooks/queries";
import { useQueryClient } from "@tanstack/react-query";

export default function StewardshipRenewal() {
    const queryClient = useQueryClient();
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(new Set());

    const { data, isLoading, isError, error, isFetching } = useStewardshipRenewalAccess();
    const updateStewardship = useUpdateStewardshipRenewal();

    const orgs = data?.data ?? [];
    const filtered = useMemo(
        () => orgs.filter((o) => o.name?.toLowerCase().includes(query.toLowerCase())),
        [orgs, query]
    );

    const enabledCount = orgs.filter((o) => o.stewardship_renewal_enabled).length;
    const disabledCount = orgs.length - enabledCount;

    function toggleOne(id) {
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    function selectAll() {
        setSelected(new Set(filtered.map((o) => o.id)));
    }

    function deselectAll() {
        setSelected(new Set());
    }

    async function toggleSingle(org) {
        try {
            await updateStewardship.mutateAsync({ id: org.id, enabled: !org.stewardship_renewal_enabled });
            toast.success(`${org.name} — stewardship renewal ${!org.stewardship_renewal_enabled ? "enabled" : "disabled"}`);
        } catch (err) {
            toast.error(err.message ?? "Failed to update organization");
        }
    }

    async function bulkUpdate(enabled) {
        if (selected.size === 0) {
            toast.info("Select at least one organization first");
            return;
        }

        const ids = Array.from(selected);
        const results = await Promise.allSettled(
            ids.map((id) => updateStewardship.mutateAsync({ id, enabled }))
        );
        const failed = results.filter((r) => r.status === "rejected").length;
        const succeeded = ids.length - failed;

        if (succeeded > 0) toast.success(`${enabled ? "Enabled" : "Disabled"} stewardship renewal for ${succeeded} organization(s)`);
        if (failed > 0) toast.error(`Failed to update ${failed} organization(s)`);

        setSelected(new Set());
    }

    function handleRefresh() {
        queryClient.invalidateQueries({ queryKey: ["stewardship-renewal-access"] });
    }

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <FaClipboardList className="text-(--accent)" />
                        <h1 className="text-2xl font-bold tracking-wide text-(--text-primary) uppercase">
                            Stewardship Renewal Access Management
                        </h1>
                    </div>
                    <p className="text-(--text-secondary) mt-1">Manage stewardship renewal access for Level 2 organizations in bulk.</p>
                </div>
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 border border-(--border-color) text-(--text-primary)
                    hover:bg-(--bg-subtle) px-4 py-2.5 rounded-lg transition text-sm font-medium shrink-0"
                >
                    <FaSync size={13} className={isFetching ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                    <p className="text-sm text-(--text-secondary)">Total Level 2 Orgs</p>
                    <p className="text-3xl font-bold text-(--text-primary) mt-2">{isLoading ? "—" : orgs.length}</p>
                </div>
                <div className="bg-(--bg-card) border border-emerald-300 dark:border-emerald-800 rounded-xl shadow-sm p-5">
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">Renewal Enabled</p>
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{isLoading ? "—" : enabledCount}</p>
                </div>
                <div className="bg-(--bg-card) border border-red-300 dark:border-red-800 rounded-xl shadow-sm p-5">
                    <p className="text-sm text-red-600 dark:text-red-400">Renewal Disabled</p>
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">{isLoading ? "—" : disabledCount}</p>
                </div>
            </section>

            <section className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) text-sm" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search organizations..."
                            className="pl-9 pr-4 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent) w-full lg:w-80"
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-(--text-secondary)">{selected.size} selected</span>
                        <button onClick={selectAll} className="px-3 py-2 rounded-lg bg-(--bg-subtle) text-(--text-primary) hover:opacity-80 transition text-sm font-medium">
                            Select All
                        </button>
                        <button onClick={deselectAll} className="px-3 py-2 rounded-lg bg-(--bg-subtle) text-(--text-primary) hover:opacity-80 transition text-sm font-medium">
                            Deselect All
                        </button>
                        <button
                            onClick={() => bulkUpdate(true)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition text-sm font-medium"
                        >
                            <FaCheck size={11} /> Enable Selected
                        </button>
                        <button
                            onClick={() => bulkUpdate(false)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition text-sm font-medium"
                        >
                            <FaTimes size={11} /> Disable Selected
                        </button>
                    </div>
                </div>

                {isLoading && <div className="py-16 text-center text-(--text-muted) text-sm">Loading organizations…</div>}

                {isError && (
                    <div className="py-10 text-center text-red-500 text-sm">
                        Couldn't load organizations: {error?.message ?? "unknown error"}.
                    </div>
                )}

                {!isLoading && !isError && (
                    <div className="overflow-x-auto max-h-130 overflow-y-auto">
                        <table className="min-w-full">
                            <thead className="sticky top-0 bg-(--bg-card)">
                                <tr className="border-b border-(--border-color) text-left text-(--text-secondary) text-sm">
                                    <th className="py-3 px-4 w-10">
                                        <input
                                            type="checkbox"
                                            checked={filtered.length > 0 && selected.size === filtered.length}
                                            onChange={(e) => (e.target.checked ? selectAll() : deselectAll())}
                                        />
                                    </th>
                                    <th className="py-3 px-4">Organization Name</th>
                                    <th className="py-3 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((org) => (
                                    <tr key={org.id} className="border-b border-(--border-color) hover:bg-(--bg-subtle) transition text-(--text-primary)">
                                        <td className="px-4 py-4">
                                            <input type="checkbox" checked={selected.has(org.id)} onChange={() => toggleOne(org.id)} />
                                        </td>
                                        <td className="px-4 py-4 font-medium">{org.name}</td>
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={() => toggleSingle(org)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                                                    org.stewardship_renewal_enabled
                                                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400"
                                                        : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-500/15 dark:text-red-400"
                                                }`}
                                            >
                                                {org.stewardship_renewal_enabled ? <FaCheck size={10} /> : <FaTimes size={10} />}
                                                {org.stewardship_renewal_enabled ? "Enabled" : "Disabled"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-10 text-center text-(--text-muted)">
                                            No organizations match your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}