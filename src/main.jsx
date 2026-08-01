import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import "./styles/globals.css";
import App from "./App";
import UserProvider from "./context/UserProvider";
import ThemeProvider from "./context/ThemeProvider";
import "./styles/theme.css";

function isRateLimited(error) {
    return error?.status === 429;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 2 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
                if (isRateLimited(error)) return false;
                return failureCount < 1;
            },
        },
        mutations: {
            retry: false,
        },
    },
    queryCache: new QueryCache({
        onError: (error) => {
            if (isRateLimited(error)) {
                toast.error(error.message);
            }
        },
    }),
    mutationCache: new MutationCache({
        onError: (error) => {
            if (isRateLimited(error)) {
                toast.error(error.message);
            }
        },
    }),
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