import { toast } from "sonner";
import { FaClock, FaCheckCircle, FaUsers, FaTachometerAlt, FaChartBar, FaFilter, FaDownload, FaSync } from "react-icons/fa";
import StatCard from "../../components/ui/StatCard";
import ChartCard from "../../components/ui/ChartCard";
import GaugeChart from "../../components/charts/GaugeChart";
import QuotientDistributionChart from "../../components/charts/QuotientDistributionChart";
import { useEnrollments } from "../../hooks/queries";
import { useQueryClient } from "@tanstack/react-query";

export default function Dashboard() {
    const queryClient = useQueryClient();

    const { data, isLoading, isFetching } = useEnrollments({ page: 1, limit: 1 });
    const totalEnrollments = data?.total ?? data?.meta?.total ?? null;

    function handleRefresh() {
        queryClient.invalidateQueries({ queryKey: ["enrollments"] });
        toast.success("Dashboard refreshed");
    }

    function handleExport() {
        toast.info("Export isn't wired up to a real endpoint yet");
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-(--text-primary)">Charism Assessment Dashboard</h1>
                <p className="text-(--text-secondary) mt-1">Track spiritual gifts and charisms across your organization</p>
            </div>

            <section className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <FaFilter className="text-(--text-secondary)" />
                    <span className="text-sm font-medium text-(--text-primary)">Filters:</span>
                    <select
                        className="px-3 py-2 rounded-lg border border-(--border-color) bg-(--bg-app)
                        text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent)"
                        defaultValue="Organizations"
                    >
                        <option>Organizations</option>
                    </select>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--accent-soft) text-(--accent-soft-text)
                        hover:opacity-80 transition text-sm font-medium"
                    >
                        <FaDownload size={13} />
                        Export Identity Mix
                    </button>
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--accent) hover:bg-(--accent-hover)
                        text-white transition text-sm font-medium"
                    >
                        <FaSync size={13} className={isFetching ? "animate-spin" : ""} />
                        Refresh
                    </button>
                </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <StatCard
                    title="Pending Assessments"
                    value="663"
                    subtitle="Awaiting completion"
                    icon={FaClock}
                    color="amber"
                />
                <StatCard
                    title="Completed Assessments"
                    value="17,636"
                    subtitle="96.38% completion rate"
                    icon={FaCheckCircle}
                    color="green"
                />
                <StatCard
                    title="Total Enrollments"
                    value={isLoading ? "—" : (totalEnrollments ?? "18,299").toLocaleString?.() ?? totalEnrollments ?? "18,299"}
                    subtitle="All time enrollments"
                    icon={FaUsers}
                    color="blue"
                />
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ChartCard title="Identity Quotient Gauge" icon={FaTachometerAlt}>
                    <GaugeChart value={0.69} />
                </ChartCard>
                <ChartCard title="Identity Quotient Distribution" icon={FaChartBar}>
                    <QuotientDistributionChart />
                </ChartCard>
            </section>
        </div>
    );
}