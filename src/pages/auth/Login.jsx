import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <div className="flex-1 bg-[#0b101d] flex flex-col justify-center px-8 sm:px-16 py-16 relative">
                <div className="w-full max-w-sm mx-auto">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-11 h-11 rounded-lg bg-[#c2622d] text-white flex items-center justify-center font-bold text-lg shrink-0">
                            UP
                        </div>
                        <span className="text-xl font-bold text-white">University Portal</span>
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
                    <p className="text-slate-400 mb-8">Sign in to access your dashboard and continue your journey.</p>

                    <LoginForm />
                </div>
            </div>

            <div
                className="hidden lg:flex flex-1 items-center px-16 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #d97706 0%, #c2622d 55%, #a84f22 100%)" }}
            >
                <div className="max-w-md">
                    <h2 className="text-4xl font-bold text-white leading-tight mb-6">
                        One Portal for Every Department
                    </h2>
                    <p className="text-white/90 text-lg leading-relaxed">
                        "The University Portal brings students, faculty and administration onto a single,
                        reliable platform. Built for a university that never stops growing."
                    </p>
                </div>
            </div>
        </div>
    );
}