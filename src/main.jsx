import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/globals.css";
import App from "./App";
import UserProvider from "./context/UserProvider";
import ThemeProvider from "./context/ThemeProvider";
import "./styles/theme.css";


ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ThemeProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </ThemeProvider>
    </BrowserRouter>
);