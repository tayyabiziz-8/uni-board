// In dev, requests go through Vite's proxy (same-origin, no CORS) —
// see vite.config.js. In production, this assumes the real API allows
// your deployed origin, or that you're proxying it another way there too.
const BASE_URL = import.meta.env.DEV ? "/api" : "https://api-mpm.stackup.solutions/api";

// Carries the HTTP status on every thrown error so callers (and the global
// QueryClient error handler in main.jsx) can special-case things like 429
// without string-matching the message.
export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

// Every fetch in this file routes its error handling through here, so rate
// limiting is handled consistently everywhere instead of per-function.
async function throwIfNotOk(res, fallbackMessage) {
    if (res.status === 429) {
        const retryAfter = res.headers.get("Retry-After");
        throw new ApiError(
            retryAfter
                ? `Too many requests — try again in ${retryAfter}s`
                : "Too many requests — please wait a moment and try again",
            429
        );
    }

    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new ApiError(body?.message ?? fallbackMessage ?? `Request failed with status ${res.status}`, res.status);
    }
}

function authHeaders() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiFetch(path, params = {}) {
    const query = new URLSearchParams(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
    ).toString();

    const url = `${BASE_URL}${path}${query ? `?${query}` : ""}`;

    const res = await fetch(url, { headers: authHeaders() });
    await throwIfNotOk(res, `Request to ${path} failed`);
    return res.json();
}

export const getOrganizations = (params) => apiFetch("/organizations", params);
export const getEnrollments = (params) => apiFetch("/enrollment", params);
export const getUsers = (params) => apiFetch("/users", params);
export const getChatbotAccess = (params) => apiFetch("/organizations/chatbot-access", params);
export const getAdmins = (params) => apiFetch("/admins", params);
export const getStewardshipRenewalAccess = (params) => apiFetch("/organizations/stewardship-renewal-access", params);
export const getQuestions = (params) => apiFetch("/questions", params);

// Confirmed shape:
// { statusCode, message, success, data: { user: { id, name, email, role, isSuperAdmin }, token } }
export async function loginAdmin(email, password) {
    if (import.meta.env.DEV) {
        console.log("loginAdmin payload:", { email, passwordLength: password?.length ?? 0 });
    }

    const res = await fetch(`${BASE_URL}/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    await throwIfNotOk(res, "Admin login failed");

    const result = await res.json();

    if (!result?.success) {
        throw new ApiError(result?.message ?? "Admin login was not successful", res.status);
    }

    return {
        token: result.data.token,
        user: result.data.user,
    };
}

// --- Admins CRUD (GET confirmed; POST/PUT/DELETE are guessed REST conventions) ---
export async function createAdmin(payload) {
    const res = await fetch(`${BASE_URL}/admins`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
    });
    await throwIfNotOk(res, "Failed to create admin");
    return res.json();
}

export async function updateAdmin(id, payload) {
    const res = await fetch(`${BASE_URL}/admins/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
    });
    await throwIfNotOk(res, "Failed to update admin");
    return res.json();
}

export async function deleteAdmin(id) {
    const res = await fetch(`${BASE_URL}/admins/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    await throwIfNotOk(res, "Failed to delete admin");
    return res.json().catch(() => ({}));
}

// --- Stewardship renewal toggle (guessed PATCH convention) ---
export async function updateStewardshipRenewal(id, enabled) {
    const res = await fetch(`${BASE_URL}/organizations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ stewardship_renewal_enabled: enabled }),
    });
    await throwIfNotOk(res, "Failed to update stewardship renewal");
    return res.json().catch(() => ({}));
}

// --- Enrollments (POST shape guessed) ---
export async function createEnrollment(payload) {
    const res = await fetch(`${BASE_URL}/enrollment`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
    });
    await throwIfNotOk(res, "Failed to create enrollment");
    return res.json();
}

// --- Chatbot access toggle (GET endpoint + PATCH convention both guessed) ---
export async function updateChatbotAccess(id, enabled) {
    const res = await fetch(`${BASE_URL}/organizations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ chatbot_access_enabled: enabled }),
    });
    await throwIfNotOk(res, "Failed to update chatbot access");
    return res.json().catch(() => ({}));
}

// --- Organizations ---
export async function createOrganization(payload) {
    const res = await fetch(`${BASE_URL}/organizations`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
    });
    await throwIfNotOk(res, "Failed to create organization");
    return res.json();
}

// --- Questions CRUD (GET confirmed; POST/PUT/DELETE guessed) ---
export async function createQuestion(payload) {
    const res = await fetch(`${BASE_URL}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
    });
    await throwIfNotOk(res, "Failed to create question");
    return res.json();
}

export async function updateQuestion(id, payload) {
    const res = await fetch(`${BASE_URL}/questions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
    });
    await throwIfNotOk(res, "Failed to update question");
    return res.json();
}

export async function deleteQuestion(id) {
    const res = await fetch(`${BASE_URL}/questions/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    await throwIfNotOk(res, "Failed to delete question");
    return res.json().catch(() => ({}));
}