import React from "react";

export default function StatCard({ title, value, subtitle, icon: Icon, color = "bg-orange-700"})
{
    return (
        <div className="bg-white hover:bg-zinc-100 border border-zinc-200 rounded-md shadow-sm p-5 hover:shadow-md transition dark:bg-zinc-700 dark:border-zinc-500 dark:hover:bg-zinc-600">
            <div className="flex justify-between items-start">

                <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-200">
                        {title}
                    </p>
                    <h2 className="text-4xl font-bold tracking-tight text-zinc-900 mt-3 dark:text-zinc-50">
                        {value}
                    </h2>
                    {subtitle && (
                        <p className="text-sm text-zinc-400 mt-2 dark:text-zinc-100">
                            {subtitle}
                        </p>
                    )}
                </div>
                {Icon && (
                    <div
                        className={`${color} p-3 rounded-md text-white text-xl dark:text-black`}>
                        <Icon />
                    </div>
                )}
            </div>
        </div>
    );
}