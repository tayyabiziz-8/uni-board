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
        throw new Error(`Request to ${path} failed with status ${res.status}`);
    }
    return res.json();
}

export const getOrganizations = (params) => apiFetch("/organizations", params);
export const getEnrollments = (params) => apiFetch("/enrollment", params);
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
        throw new Error(`Admin login failed with status ${res.status}`);
    }

    const result = await res.json();

    if (!result?.success) {
        throw new Error(result?.message ?? "Admin login was not successful");
    }

    return {
        token: result.data.token,
        user: result.data.user,
    };
}

// --- Admins CRUD ---
export async function createAdmin(payload) {
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

export async function updateAdmin(id, payload) {
    const res = await fetch(`${BASE_URL}/admins/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Failed to update admin (status ${res.status})`);
    }
    return res.json();
}

export async function deleteAdmin(id) {
    const res = await fetch(`${BASE_URL}/admins/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Failed to delete admin (status ${res.status})`);
    }
    return res.json().catch(() => ({}));
}

// --- Stewardship renewal ---
export const getStewardshipRenewalAccess = (params) =>
    apiFetch("/organizations/stewardship-renewal-access", params);

export async function updateStewardshipRenewal(id, enabled) {
    const res = await fetch(`${BASE_URL}/organizations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ stewardship_renewal_enabled: enabled }),
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Failed to update stewardship renewal (status ${res.status})`);
    }
    return res.json().catch(() => ({}));
}

// --- Enrollments ---
export async function createEnrollment(payload) {
    const res = await fetch(`${BASE_URL}/enrollment`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Failed to create enrollment (status ${res.status})`);
    }
    return res.json();
}

// --- Chatbot access ---
export async function updateChatbotAccess(id, enabled) {
    const res = await fetch(`${BASE_URL}/organizations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ chatbot_access_enabled: enabled }),
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Failed to update chatbot access (status ${res.status})`);
    }
    return res.json().catch(() => ({}));
}

// --- Organizations ---
export async function createOrganization(payload) {
    const res = await fetch(`${BASE_URL}/organizations`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Failed to create organization (status ${res.status})`);
    }
    return res.json();
}

export const getQuestions = (params) => apiFetch("/questions", params);

export async function createQuestion(payload) {
    const res = await fetch(`${BASE_URL}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Failed to create question (status ${res.status})`);
    }
    return res.json();
}
export async function updateQuestion(id, payload) {
    const res = await fetch(`${BASE_URL}/questions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Failed to update question (status ${res.status})`);
    }
    return res.json();
}
export async function deleteQuestion(id) {
    const res = await fetch(`${BASE_URL}/questions/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Failed to delete question (status ${res.status})`);
    }
    return res.json().catch(() => ({}));
}