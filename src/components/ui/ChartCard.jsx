import React from "react";

export default function ChartCard({ title, icon: Icon, children }) {
    return (
        <div className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
                {Icon && <Icon className="text-(--accent) text-base" />}
                <h2 className="text-lg font-semibold text-(--text-primary)">{title}</h2>
            </div>

            <div className="overflow-hidden">{children}</div>
        </div>
    );
}