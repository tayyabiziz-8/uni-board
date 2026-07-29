import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import {
    getOrganizations,
    getEnrollments,
    getUsers,
    getChatbotAccess,
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
} from "../api/api";

export function useOrganizations(params = {}) {
    return useQuery({
        queryKey: ["organizations", params],
        queryFn: () => getOrganizations(params),
        placeholderData: keepPreviousData,
    });
}
export function useEnrollmentMetrics() {
    return useQuery({
        queryKey: ["enrollment-metrics"],
        queryFn: getEnrollments,
    });
}
export function useUsersQuery({ page = 1, limit = 10, search = "" } = {}) {
    return useQuery({
        queryKey: ["users", { page, limit, search }],
        queryFn: () => getUsers({ page, limit, search }),
        placeholderData: keepPreviousData,
    });
}
export function useAdmins({ page = 1, limit = 10, search = "" } = {}) {
    return useQuery({
        queryKey: ["admins", { page, limit, search }],
        queryFn: () => getAdmins({ page, limit, search }),
        placeholderData: keepPreviousData,
    });
}
export function useChatbotAccess(params = {}) {
    return useQuery({
        queryKey: ["chatbot-access", params],
        queryFn: () => getChatbotAccess(params),
    });
}
export function useCreateAdmin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAdmin,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admins"] }),
    });
}
export function useUpdateAdmin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => updateAdmin(id, payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admins"] }),
    });
}
export function useDeleteAdmin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => deleteAdmin(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admins"] }),
    });
}