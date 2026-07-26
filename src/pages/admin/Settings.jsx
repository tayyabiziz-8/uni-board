import { useState } from "react";
import { FaUniversity, FaBell, FaShieldAlt, FaSave } from "react-icons/fa";

function SettingsSection({ icon: Icon, title, description, children }) {
    return (
        <div className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-1">
                <div className="p-2 rounded-lg bg-(--accent-soft) text-(--accent-soft-text)">
                    <Icon />
                </div>
                <h2 className="text-lg font-semibold text-(--text-primary)">{title}</h2>
            </div>
            {description && <p className="text-sm text-(--text-secondary) mb-5 ml-11">{description}</p>}
            <div className="space-y-4">{children}</div>
        </div>
    );
}

function ToggleRow({ label, description, defaultChecked = false }) {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <p className="text-sm font-medium text-(--text-primary)">{label}</p>
                {description && <p className="text-xs text-(--text-muted) mt-0.5">{description}</p>}
            </div>
            <button
                onClick={() => setChecked(!checked)}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                    checked ? "bg-(--accent)" : "bg-(--border-strong)"
                }`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                        checked ? "translate-x-5" : "translate-x-0"
                    }`}
                />
            </button>
        </div>
    );
}

export default function Settings() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-(--text-primary)">System Settings</h1>
                <p className="text-(--text-secondary) mt-1">Manage university-wide portal configuration.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <SettingsSection icon={FaUniversity} title="University Information" description="Basic details shown across the portal.">
                    <label className="block">
                        <span className="text-sm font-medium text-(--text-primary)">University Name</span>
                        <input
                            className="border border-(--border-color) bg-(--bg-app) text-(--text-primary)
                            rounded-lg p-3 w-full mt-2 outline-none focus:ring-2 focus:ring-(--accent)"
                            defaultValue="ITU (Information Technology University)"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-(--text-primary)">Academic Year</span>
                        <input
                            className="border border-(--border-color) bg-(--bg-app) text-(--text-primary)
                            rounded-lg p-3 w-full mt-2 outline-none focus:ring-2 focus:ring-(--accent)"
                            defaultValue="2026-2027"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-(--text-primary)">Current Semester</span>
                        <select
                            className="border border-(--border-color) bg-(--bg-app) text-(--text-primary)
                            rounded-lg p-3 w-full mt-2 outline-none focus:ring-2 focus:ring-(--accent)"
                            defaultValue="Spring 2026"
                        >
                            <option>Spring 2026</option>
                            <option>Fall 2026</option>
                            <option>Summer 2026</option>
                        </select>
                    </label>
                </SettingsSection>

                <SettingsSection icon={FaBell} title="Notifications" description="Choose what admins get notified about.">
                    <ToggleRow label="New admission applications" description="Notify when a student submits an application" defaultChecked />
                    <ToggleRow label="Weekly attendance summary" description="Sent every Monday morning" defaultChecked />
                    <ToggleRow label="Faculty rating alerts" description="Notify when a teacher rating drops below 4.0" />
                    <ToggleRow label="System maintenance notices" description="Scheduled downtime and updates" defaultChecked />
                </SettingsSection>

                <SettingsSection icon={FaShieldAlt} title="Access & Security" description="Controls affecting all portal accounts.">
                    <ToggleRow label="Require two-factor authentication" description="Applies to admin and teacher accounts" />
                    <ToggleRow label="Allow self-registration for students" defaultChecked />
                    <ToggleRow label="Auto-lock inactive accounts after 90 days" defaultChecked />
                </SettingsSection>

                <SettingsSection icon={FaUniversity} title="Grading Scale" description="Used across analytics and transcripts.">
                    <label className="block">
                        <span className="text-sm font-medium text-(--text-primary)">Minimum Passing CGPA</span>
                        <input
                            type="number"
                            step="0.1"
                            className="border border-(--border-color) bg-(--bg-app) text-(--text-primary)
                            rounded-lg p-3 w-full mt-2 outline-none focus:ring-2 focus:ring-(--accent)"
                            defaultValue="2.0"
                        />
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-(--text-primary)">Attendance Requirement (%)</span>
                        <input
                            type="number"
                            className="border border-(--border-color) bg-(--bg-app) text-(--text-primary)
                            rounded-lg p-3 w-full mt-2 outline-none focus:ring-2 focus:ring-(--accent)"
                            defaultValue="75"
                        />
                    </label>
                </SettingsSection>
            </div>

            <div className="flex justify-end">
                <button className="flex items-center gap-2 bg-(--accent) hover:bg-(--accent-hover) text-white px-6 py-3 rounded-lg transition font-medium">
                    <FaSave />
                    Save Settings
                </button>
            </div>
        </div>
    );
}