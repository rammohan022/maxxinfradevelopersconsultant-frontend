import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface Lead {
    id: string; // Changed to string for UUID support
    fullName: string;
    email: string;
    phoneNumber: string;
    subject?: string;
    message: string;
    source?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateLeadDto {
    fullName: string;
    email: string;
    phoneNumber: string;
    subject?: string;
    message: string;
    source?: string;
}

export const leadApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLeads: builder.query<Lead[], void>({
            query: () => ({
                url: API_ENDPOINTS.leads,
                method: "GET",
            }),
            providesTags: ["Lead"],
        }),
        createLead: builder.mutation<Lead, CreateLeadDto>({
            query: (body) => ({
                url: API_ENDPOINTS.leads,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Lead"],
        }),
        deleteLead: builder.mutation<void, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.leads}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Lead"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetLeadsQuery,
    useCreateLeadMutation,
    useDeleteLeadMutation,
} = leadApi;
