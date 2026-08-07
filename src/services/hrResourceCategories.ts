import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface HrResourceCategory {
    id: string;
    name: string;
    iconName?: string;
    orderIndex: number;
    createdAt: string;
    updatedAt: string;
}

export const hrResourceCategoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHrResourceCategories: builder.query<HrResourceCategory[], void>({
            query: () => ({
                url: `${API_ENDPOINTS.hrResources.replace('/hr-resources', '/hr-resource-categories')}`,
                method: "GET",
            }),
            providesTags: ["HrResourceCategory"],
        }),
        getPublicHrResourceCategories: builder.query<HrResourceCategory[], void>({
            query: () => ({
                url: `${API_ENDPOINTS.hrResources.replace('/hr-resources', '/hr-resource-categories')}/public`,
                method: "GET",
            }),
            providesTags: ["HrResourceCategory"],
        }),
        createHrResourceCategory: builder.mutation<HrResourceCategory, Partial<HrResourceCategory>>({
            query: (body) => ({
                url: `${API_ENDPOINTS.hrResources.replace('/hr-resources', '/hr-resource-categories')}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["HrResourceCategory"],
        }),
        updateHrResourceCategory: builder.mutation<HrResourceCategory, { id: string; data: Partial<HrResourceCategory> }>({
            query: ({ id, data }) => ({
                url: `${API_ENDPOINTS.hrResources.replace('/hr-resources', '/hr-resource-categories')}/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["HrResourceCategory"],
        }),
        deleteHrResourceCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.hrResources.replace('/hr-resources', '/hr-resource-categories')}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["HrResourceCategory"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetHrResourceCategoriesQuery,
    useGetPublicHrResourceCategoriesQuery,
    useCreateHrResourceCategoryMutation,
    useUpdateHrResourceCategoryMutation,
    useDeleteHrResourceCategoryMutation,
} = hrResourceCategoriesApi;
