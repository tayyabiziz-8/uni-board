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
    getStewardshipRenewalAccess,
    updateStewardshipRenewal,
    createEnrollment,
    updateChatbotAccess,
    createOrganization,
} from "../api/api";

export function useOrganizations(params = {}) {
    return useQuery({
        queryKey: ["organizations", params],
        queryFn: () => getOrganizations(params),
        placeholderData: keepPreviousData,
    });
}
export function useEnrollments({ page = 1, limit = 25, search = "" } = {}) {
    return useQuery({
        queryKey: ["enrollments", { page, limit, search }],
        queryFn: () => getEnrollments({ page, limit, search }),
        placeholderData: keepPreviousData,
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
export function useStewardshipRenewalAccess(params = {}) {
    return useQuery({
        queryKey: ["stewardship-renewal-access", params],
        queryFn: () => getStewardshipRenewalAccess(params),
    });
}
export function useUpdateStewardshipRenewal() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, enabled }) => updateStewardshipRenewal(id, enabled),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["stewardship-renewal-access"] }),
    });
}
export function useCreateEnrollment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createEnrollment,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["enrollments"] }),
    });
}
export function useUpdateChatbotAccess() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, enabled }) => updateChatbotAccess(id, enabled),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chatbot-access"] });
            queryClient.invalidateQueries({ queryKey: ["organizations"] });
        },
    });
}
export function useCreateOrganization() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createOrganization,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["organizations"] }),
    });
}