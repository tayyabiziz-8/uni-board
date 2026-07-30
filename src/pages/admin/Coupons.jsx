import { useState } from "react";
import { toast } from "sonner";
import { FaDollarSign, FaTags, FaCheckCircle, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import Modal from "../../components/ui/Modal";
import AddCouponForm from "../../components/forms/AddCouponForm";
import useDebounce from "../../hooks/useDebounce";

const initialCoupons = [
    { id: 1, code: "WELCOME25", discount_type: "percentage", discount_value: 25, usage_limit: 200, used: 143, expires_at: "2026-09-01", active: true },
    { id: 2, code: "PARISH50", discount_type: "fixed", discount_value: 50, usage_limit: 100, used: 87, expires_at: "2026-08-15", active: true },
    { id: 3, code: "RENEWAL10", discount_type: "percentage", discount_value: 10, usage_limit: 500, used: 412, expires_at: "2026-12-31", active: true },
    { id: 4, code: "SUMMER2025", discount_type: "percentage", discount_value: 20, usage_limit: 150, used: 150, expires_at: "2025-08-31", active: false },
];

function formatDate(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Coupons() {
    const [coupons, setCoupons] = useState(initialCoupons);
    const [query, setQuery] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const debouncedQuery = useDebounce(query, 500);

    const filtered = coupons.filter((c) => c.code.toLowerCase().includes(debouncedQuery.toLowerCase()));
    const activeCount = coupons.filter((c) => c.active).length;
    const totalRedemptions = coupons.reduce((sum, c) => sum + c.used, 0);

    function handleAddCoupon(values, { setSubmitting, resetForm }) {
        const newCoupon = {
            id: Math.max(0, ...coupons.map((c) => c.id)) + 1,
            ...values,
            discount_value: Number(values.discount_value),
            usage_limit: Number(values.usage_limit),
            used: 0,
            active: true,
        };
        setCoupons((prev) => [newCoupon, ...prev]);
        toast.success("Coupon added successfully");
        resetForm();
        setSubmitting(false);
        setModalOpen(false);
    }

    function handleDelete(coupon) {
        if (!window.confirm(`Delete coupon ${coupon.code}?`)) return;
        setCoupons((prev) => prev.filter((c) => c.id !== coupon.id));
        toast.success("Coupon deleted");
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold text-(--text-primary)">Coupons</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 bg-(--accent)] hover:bg-(--accent-hover) text-white px-4 py-2.5 rounded-lg transition text-sm font-medium shrink-0"
                >
                    <FaPlus size={13} /> Add Coupon
                </button>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <StatCard title="Total Coupons" value={coupons.length} subtitle="All coupons" icon={FaTags} color="rust" />
                <StatCard title="Active Coupons" value={activeCount} subtitle="Currently usable" icon={FaCheckCircle} color="green" />
                <StatCard title="Total Redemptions" value={totalRedemptions} subtitle="Across all coupons" icon={FaDollarSign} color="amber" />
            </section>

            <section className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-semibold text-(--text-primary)">All Coupons</h2>
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) text-sm" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by code..."
                            className="pl-9 pr-4 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent) w-64"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-(--border-color) text-left text-(--text-secondary) text-sm">
                                <th className="py-3 px-4">Code</th>
                                <th className="py-3 px-4">Discount</th>
                                <th className="py-3 px-4">Usage</th>
                                <th className="py-3 px-4">Expires</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((c) => (
                                <tr
                                    key={c.id}
                                    className="border-b border-(--border-color) hover:bg-(--bg-subtle) transition text-(--text-primary)"
                                >
                                    <td className="px-4 py-4 font-mono font-semibold">{c.code}</td>
                                    <td className="px-4 py-4">
                                        {c.discount_type === "percentage" ? `${c.discount_value}%` : `$${c.discount_value}`}
                                    </td>
                                    <td className="px-4 py-4">{c.used}/{c.usage_limit}</td>
                                    <td className="px-4 py-4">{formatDate(c.expires_at)}</td>
                                    <td className="px-4 py-4">
                                        <StatusBadge status={c.active ? "Active" : "Inactive"} />
                                    </td>
                                    <td className="px-4 py-4">
                                        <button
                                            onClick={() => handleDelete(c)}
                                            className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-500/15 dark:text-red-400 dark:hover:bg-red-500/25 transition"
                                            title="Delete"
                                        >
                                            <FaTrash size={13} />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-10 text-center text-(--text-muted)">
                                        No coupons match your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Coupon">
                <AddCouponForm onSubmit={handleAddCoupon} onCancel={() => setModalOpen(false)} />
            </Modal>
        </div>
    );
}