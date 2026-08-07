import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface CreateHrResourceDto {
    title: string;
    description: string;
    category: string;
    fileType: string;
    fileUrl: string;
}

export interface HrResource extends CreateHrResourceDto {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export const hrResourcesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHrResources: builder.query<HrResource[], void>({
            query: () => ({
                url: API_ENDPOINTS.hrResources,
                method: "GET",
            }),
            providesTags: ["HrResource"],
        }),
        getPublicHrResources: builder.query<HrResource[], { search?: string; category?: string }>({
            query: (params) => {
                const searchParams = new URLSearchParams();
                if (params.search) searchParams.append("search", params.search);
                if (params.category && params.category !== "All Resources") searchParams.append("category", params.category);
                
                return {
                    url: `${API_ENDPOINTS.hrResources}/public?${searchParams.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["HrResource"],
        }),
        getHrResourceById: builder.query<HrResource, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.hrResources}/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "HrResource", id }],
        }),
        uploadHrResourceFile: builder.mutation<{ url: string; filename: string }, FormData>({
            query: (body) => ({
                url: `${API_ENDPOINTS.hrResources}/upload`,
                method: "POST",
                body,
            }),
        }),
        createHrResource: builder.mutation<HrResource, CreateHrResourceDto>({
            query: (body) => ({
                url: API_ENDPOINTS.hrResources,
                method: "POST",
                body,
            }),
            invalidatesTags: ["HrResource"],
        }),
        updateHrResource: builder.mutation<HrResource, { id: string; data: Partial<CreateHrResourceDto> }>({
            query: ({ id, data }) => ({
                url: `${API_ENDPOINTS.hrResources}/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => ["HrResource", { type: "HrResource", id }],
        }),
        deleteHrResource: builder.mutation<void, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.hrResources}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["HrResource"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetHrResourcesQuery,
    useGetPublicHrResourcesQuery,
    useGetHrResourceByIdQuery,
    useUploadHrResourceFileMutation,
    useCreateHrResourceMutation,
    useUpdateHrResourceMutation,
    useDeleteHrResourceMutation,
} = hrResourcesApi;
