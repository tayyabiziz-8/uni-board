const BASE_URL = 'https://api-mpm.stackup.solutions/api';

export async function getOrganizations() {
    const res = await fetch(BASE_URL + '/organizations')
    return res.json();
}

export async function getEnrollments() {
    const res = await fetch(BASE_URL + '/enrollment/metrics')
    return res.json();
}

export async function getUsers() {
    const res = await fetch(BASE_URL + '/users')
    return res.json();
}

export async function getChatbotAccess() {
    const res = await fetch(BASE_URL + '/organizations/chatbot-access')
    return res.json();
}

export async function getAdmins() {
    const res = await fetch(BASE_URL + '/admins')
    return res.json();
}

export default BASE_URL;