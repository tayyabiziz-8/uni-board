import { FaTimes } from "react-icons/fa";

export default function Modal({ open, onClose, title, children }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div
                className="relative bg-(--bg-card) border border-(--border-color) rounded-xl shadow-2xl
                w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-(--border-color) sticky top-0 bg-(--bg-card)">
                    <h2 className="text-lg font-semibold text-(--text-primary)">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-(--text-secondary) hover:bg-(--bg-subtle) hover:text-(--text-primary) transition"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}