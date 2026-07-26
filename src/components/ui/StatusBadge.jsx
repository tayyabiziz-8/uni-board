import React from "react";

// Shared status pill used across Dashboard, Users, Admissions, Announcements
// so every "Active / Pending / Approved / Rejected" style badge in the app
// stays visually identical.
const STATUS_STYLES = {
    active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    published: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    draft: "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-400",
    inactive: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    rejected: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

export default function StatusBadge({ status }) {
    const key = status?.toLowerCase();
    const style = STATUS_STYLES[key] ?? STATUS_STYLES.draft;

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${style}`}>
            {status}
        </span>
    );
}