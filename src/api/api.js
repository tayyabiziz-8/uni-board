const BASE_URL = import.meta.env.DEV ? "/api" : "https://api-mpm.stackup.solutions/api";

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

    if (!res.ok) {
        throw new Error(`Request to ${path} failed with status: ${res.status}`);
    }
    return res.json();
}

export const getOrganizations = (params) => apiFetch("/organizations", params);
export const getEnrollments = () => apiFetch("/enrollment/metrics");
export const getUsers = (params) => apiFetch("/users", params);
export const getChatbotAccess = (params) => apiFetch("/organizations/chatbot-access", params);
export const getAdmins = (params) => apiFetch("/admins", params);

export async function loginAdmin(email, password) {
    if (import.meta.env.DEV) {
        console.log("loginAdmin payload:", { email, passwordLength: password?.length ?? 0 });
    }

    const res = await fetch(`${BASE_URL}/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        throw new Error(`Admin login failed, Status: ${res.status}`);
    }

    const result = await res.json();
    if (!result?.success) {
        throw new Error(result?.message ?? "Admin login unsuccessful");
    }

    return {
        token: result.data.token,
        user: result.data.user,
    };
}

// --- Admins CRUD ---
export async function createAdmin(payload)
{
    const res = await fetch(`${BASE_URL}/admins`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Failed to create admin (status ${res.status})`);
    }
    return res.json();
}

export async function updateAdmin(id, payload)
{
    const res = await fetch(`${BASE_URL}/admins/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Failed to update admin (status: ${res.status})`);
    }
    return res.json();
}
export async function deleteAdmin(id)
{
    const res = await fetch(`${BASE_URL}/admins/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Failed to delete admin (status: ${res.status})`);
    }
    return res.json().catch(() => ({}));
}