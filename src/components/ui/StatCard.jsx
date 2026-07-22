import React from "react";

export default function StatCard({ title, value, subtitle, icon: Icon, color = "bg-orange-700"})
{
    return (
        <div className="bg-white border border-zinc-200 rounded-md shadow-sm p-5 hover:shadow-md transition">
            <div className="flex justify-between items-start">

                <div>
                    <p className="text-sm text-zinc-500">
                        {title}
                    </p>
                    <h2 className="text-4xl font-bold tracking-tight text-zinc-900 mt-3">
                        {value}
                    </h2>
                    {subtitle && (
                        <p className="text-sm text-zinc-400 mt-2">
                            {subtitle}
                        </p>
                    )}
                </div>
                {Icon && (
                    <div
                        className={`${color} p-3 rounded-md text-white text-xl`}>
                        <Icon />
                    </div>
                )}
            </div>
        </div>
    );
}