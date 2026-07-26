import { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../../data/users";
import { useUserContext } from "../../context/UserProvider";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useUserContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    function handleLogin(e) {
        e.preventDefault();

        const foundUser = users.find(
            (user) => user.username === username && user.password === password
        );

        if (!foundUser) {
            setError("Invalid Credentials");
            return;
        }

        login(foundUser);
        navigate(`/${foundUser.role}`);
    }

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
                <label className="block text-sm text-slate-300 mb-2">Username</label>
                <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#131a2c] border border-[#232c44] text-white
                        placeholder-slate-500 outline-none focus:ring-2 focus:ring-[#c2622d] transition"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm text-slate-300 mb-2">Password</label>
                <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#131a2c] border border-[#232c44] text-white
                        placeholder-slate-500 outline-none focus:ring-2 focus:ring-[#c2622d] transition"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
                type="submit"
                className="bg-[#c2622d] hover:bg-[#a84f22] text-white font-semibold py-3 rounded-lg transition mt-1"
            >
                Login
            </button>

            <div className="text-xs text-slate-500 border-t border-[#232c44] pt-4 mt-1 space-y-1">
                <p className="text-slate-400 font-medium mb-1">Demo credentials</p>
                <p>student / 123 - WIP</p>
                <p>teacher / 123 - WIP</p>
                <p>admin / 123 - this works</p>
            </div>
        </form>
    );
}