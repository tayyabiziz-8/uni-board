import { useTheme } from "../../context/ThemeProvider";

export default function Footer() {

    return (
        <footer className="bg-(--bg-card) border-b border-(--border-color) text-(--text-primary) text-center text-sm py-4 px-4 mt-auto">
            © 2026 Many Parts
        </footer>
    );
}