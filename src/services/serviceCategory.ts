import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface CreateServiceCategoryDto {
    name: string;
    slug: string;
}

export interface ServiceCategory extends CreateServiceCategoryDto {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export const serviceCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceCategories: builder.query<ServiceCategory[], void>({
            query: () => ({
                url: API_ENDPOINTS.serviceCategories,
                method: "GET",
            }),
            providesTags: ["ServiceCategory"],
        }),
        getServiceCategoryById: builder.query<ServiceCategory, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.serviceCategories}/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "ServiceCategory", id }],
        }),
        createServiceCategory: builder.mutation<ServiceCategory, CreateServiceCategoryDto>({
            query: (body) => ({
                url: API_ENDPOINTS.serviceCategories,
                method: "POST",
                body,
            }),
            invalidatesTags: ["ServiceCategory"],
        }),
        updateServiceCategory: builder.mutation<ServiceCategory, { id: string; data: Partial<CreateServiceCategoryDto> }>({
            query: ({ id, data }) => ({
                url: `${API_ENDPOINTS.serviceCategories}/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => ["ServiceCategory", { type: "ServiceCategory", id }],
        }),
        deleteServiceCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.serviceCategories}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ServiceCategory"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetServiceCategoriesQuery,
    useGetServiceCategoryByIdQuery,
    useCreateServiceCategoryMutation,
    useUpdateServiceCategoryMutation,
    useDeleteServiceCategoryMutation,
} = serviceCategoryApi;
