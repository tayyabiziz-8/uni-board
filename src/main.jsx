import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "./styles/globals.css";
import App from "./App";
import UserProvider from "./context/UserProvider";
import ThemeProvider from "./context/ThemeProvider";
import "./styles/theme.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
            retry: 1,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <ThemeProvider>
                <UserProvider>
                    <App />
                    <Toaster richColors position="top-right" />
                </UserProvider>
            </ThemeProvider>
        </BrowserRouter>
    </QueryClientProvider>
);