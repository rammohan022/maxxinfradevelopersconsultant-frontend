import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface BlogPost {
    id: string; // Changed to string for UUID
    title: string;
    slug: string;
    content: string;
    category?: string;
    status: "Draft" | "Published";
    displayOrder?: number;
    blogImage?: string;
    metaTitle?: string;
    metaDescription?: string;
    createdAt: string;
    updatedAt: string;
    faqs?: { question: string; answer: string }[];
}

export interface CreateBlogDto {
    title: string;
    slug: string;
    content: string;
    category?: string;
    status?: "Draft" | "Published";
    displayOrder?: number;
    blogImage?: File;
    metaTitle?: string;
    metaDescription?: string;
    faqs?: string;
}

export interface UpdateBlogDto {
    title?: string;
    slug?: string;
    content?: string;
    category?: string;
    status?: "Draft" | "Published";
    displayOrder?: number;
    blogImage?: File;
    metaTitle?: string;
    metaDescription?: string;
    faqs?: string;
}

export const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query<BlogPost[], void>({
            query: () => ({
                url: API_ENDPOINTS.blogs,
                method: "GET",
            }),
            providesTags: ["Blog"],
        }),
        getBlogById: builder.query<BlogPost, string>({ // Changed to string
            query: (id) => ({
                url: `${API_ENDPOINTS.blogs}/${id}`,
                method: "GET",
            }),
        }),
        createBlog: builder.mutation<BlogPost, FormData>({
            query: (body) => ({
                url: API_ENDPOINTS.blogs,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Blog"],
        }),
        updateBlog: builder.mutation<BlogPost, { id: string; data: FormData }>({ // Changed to string
            query: ({ id, data }) => ({
                url: `${API_ENDPOINTS.blogs}/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Blog"],
        }),
        deleteBlog: builder.mutation<void, string>({ // Changed to string
            query: (id) => ({
                url: `${API_ENDPOINTS.blogs}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Blog"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetBlogsQuery,
    useGetBlogByIdQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogApi;
