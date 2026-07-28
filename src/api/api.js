const BASE_URL = import.meta.env.DEV ? "/api" : "https://api-mpm.stackup.solutions/api";

function authHeaders() {
    localStorage.setItem("token", "PLACE_TOKEN_HERE_MANUALLY_IF_LOGIN_DOES_NOT_RETURN_A_TOKEN")
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
        throw new Error(`Request to ${path} failed with status ${res.status}`);
    }

    return res.json();
}

export const getOrganizations = (params) => apiFetch("/organizations", params);
export const getEnrollments = () => apiFetch("/enrollment/metrics");
export const getUsers = (params) => apiFetch("/users", params);
export const getChatbotAccess = (params) => apiFetch("/organizations/chatbot-access", params);
export const getAdmins = (params) => apiFetch("/admins", params);

async function tryAdminLogin(body) {
    const res = await fetch(`${BASE_URL}/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        return { ok: false, status: res.status };
    }

    const data = await res.json();
    const token = data?.token ?? data?.accessToken ?? data?.data?.token ?? null;
    return { ok: true, token };
}

export async function loginAdmin(username, password) {
    let result = await tryAdminLogin({ email: username, password });

    if (!result.ok) {
        result = await tryAdminLogin({ username, password });
    }

    if (!result.ok) {
        throw new Error(`Admin login failed with status ${result.status}`);
    }

    return result.token;
}