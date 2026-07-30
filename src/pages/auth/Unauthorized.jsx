import { useNavigate } from "react-router-dom";
import { FaUniversity, FaArrowLeft } from "react-icons/fa";

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b101d] px-6 text-center">
            <div className="w-14 h-14 rounded-xl bg-[#c2622d]/15 text-[#c2622d] flex items-center justify-center text-2xl mb-6">
                <FaUniversity />
            </div>

            <h1 className="text-4xl font-bold text-white mb-3">Access Restricted</h1>
            <p className="text-slate-400 max-w-md mb-8">
                You don't have permission to view this part of the Portal. If you think this is a
                mistake, contact your system administrator.
            </p>

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 bg-[#c2622d] hover:bg-[#a84f22] text-white px-6 py-3 rounded-lg transition font-medium"
            >
                <FaArrowLeft size={14} />
                Go Back
            </button>
        </div>
    );
}