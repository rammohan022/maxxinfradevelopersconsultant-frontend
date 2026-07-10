import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface LegalDocument {
    id: string;
    title: string;
    content: string;
    status: "Draft" | "Published";
    createdAt: string;
    updatedAt: string;
}

export const legalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPrivacyPolicies: builder.query<LegalDocument[], void>({
            query: () => ({
                url: API_ENDPOINTS.privacyPolicy,
                method: "GET",
            }),
            providesTags: ["Legal"],
        }),
        getTermsConditions: builder.query<LegalDocument[], void>({
            query: () => ({
                url: API_ENDPOINTS.termsConditions,
                method: "GET",
            }),
            providesTags: ["Legal"],
        }),
        createPrivacyPolicy: builder.mutation<LegalDocument, Partial<LegalDocument>>({
            query: (body) => ({
                url: API_ENDPOINTS.privacyPolicy,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Legal"],
        }),
        createTermsCondition: builder.mutation<LegalDocument, Partial<LegalDocument>>({
            query: (body) => ({
                url: API_ENDPOINTS.termsConditions,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Legal"],
        }),
        updatePrivacyPolicy: builder.mutation<LegalDocument, { id: string; data: Partial<LegalDocument> }>({
            query: ({ id, data }) => ({
                url: `${API_ENDPOINTS.privacyPolicy}/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => ["Legal", { type: "Legal", id }],
        }),
        updateTermsCondition: builder.mutation<LegalDocument, { id: string; data: Partial<LegalDocument> }>({
            query: ({ id, data }) => ({
                url: `${API_ENDPOINTS.termsConditions}/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => ["Legal", { type: "Legal", id }],
        }),
        deletePrivacyPolicy: builder.mutation<void, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.privacyPolicy}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Legal"],
        }),
        deleteTermsCondition: builder.mutation<void, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.termsConditions}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Legal"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetPrivacyPoliciesQuery,
    useGetTermsConditionsQuery,
    useCreatePrivacyPolicyMutation,
    useCreateTermsConditionMutation,
    useUpdatePrivacyPolicyMutation,
    useUpdateTermsConditionMutation,
    useDeletePrivacyPolicyMutation,
    useDeleteTermsConditionMutation,
} = legalApi;
