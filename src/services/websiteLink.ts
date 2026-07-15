import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface CreateWebsiteLinkDto {
    title: string;
    url: string;
    order?: number;
}

export interface WebsiteLink extends CreateWebsiteLinkDto {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export const websiteLinkApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWebsiteLinks: builder.query<WebsiteLink[], void>({
            query: () => ({
                url: API_ENDPOINTS.websiteLinks,
                method: "GET",
            }),
            providesTags: ["WebsiteLink"],
        }),
        getWebsiteLinkById: builder.query<WebsiteLink, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.websiteLinks}/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "WebsiteLink", id }],
        }),
        createWebsiteLink: builder.mutation<WebsiteLink, CreateWebsiteLinkDto>({
            query: (body) => ({
                url: API_ENDPOINTS.websiteLinks,
                method: "POST",
                body,
            }),
            invalidatesTags: ["WebsiteLink"],
        }),
        updateWebsiteLink: builder.mutation<WebsiteLink, { id: string; data: Partial<CreateWebsiteLinkDto> }>({
            query: ({ id, data }) => ({
                url: `${API_ENDPOINTS.websiteLinks}/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => ["WebsiteLink", { type: "WebsiteLink", id }],
        }),
        deleteWebsiteLink: builder.mutation<void, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.websiteLinks}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["WebsiteLink"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetWebsiteLinksQuery,
    useGetWebsiteLinkByIdQuery,
    useCreateWebsiteLinkMutation,
    useUpdateWebsiteLinkMutation,
    useDeleteWebsiteLinkMutation,
} = websiteLinkApi;
