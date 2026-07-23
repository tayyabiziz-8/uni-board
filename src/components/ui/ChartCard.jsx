import React from "react";

export default function ChartCard({ title, children }) {

    return (
        <div
            className="bg-white border border-zinc-200 rounded-md shadow-sm p-4 sm:p-5 dark:bg-zinc-800 dark:border-zinc-700">

            <h2 className="text-lg font-semibold text-zinc-700 mb-4 dark:text-zinc-300">
                {title}
            </h2>

            <div className="overflow-hidden">
                {children}
            </div>
        </div>
    );
}