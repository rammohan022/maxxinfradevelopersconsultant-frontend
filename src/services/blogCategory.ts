import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface CreateBlogCategoryDto {
    name: string;
    slug: string;
}

export interface BlogCategory extends CreateBlogCategoryDto {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export const blogCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBlogCategories: builder.query<BlogCategory[], void>({
            query: () => ({
                url: API_ENDPOINTS.blogCategories,
                method: "GET",
            }),
            providesTags: ["BlogCategory"],
        }),
        getBlogCategoryById: builder.query<BlogCategory, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.blogCategories}/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "BlogCategory", id }],
        }),
        createBlogCategory: builder.mutation<BlogCategory, CreateBlogCategoryDto>({
            query: (body) => ({
                url: API_ENDPOINTS.blogCategories,
                method: "POST",
                body,
            }),
            invalidatesTags: ["BlogCategory"],
        }),
        updateBlogCategory: builder.mutation<BlogCategory, { id: string; data: Partial<CreateBlogCategoryDto> }>({
            query: ({ id, data }) => ({
                url: `${API_ENDPOINTS.blogCategories}/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => ["BlogCategory", { type: "BlogCategory", id }],
        }),
        deleteBlogCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.blogCategories}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["BlogCategory"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetBlogCategoriesQuery,
    useGetBlogCategoryByIdQuery,
    useCreateBlogCategoryMutation,
    useUpdateBlogCategoryMutation,
    useDeleteBlogCategoryMutation,
} = blogCategoryApi;
