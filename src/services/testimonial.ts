import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface Testimonial {
    id: string;
    clientName: string;
    testimonialText: string;
    clientImage?: string;
    rating: number;
    isActive: boolean;
    caseType: string;
    displayOrder: number;
    createdAt?: string;
    updatedAt?: string;
}

export const testimonialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTestimonials: builder.query<Testimonial[], void>({
            query: () => ({
                url: API_ENDPOINTS.testimonials,
                method: "GET",
            }),
            providesTags: ["Testimonial"],
        }),
        getTestimonialById: builder.query<Testimonial, string>({ // Changed to string
            query: (id) => ({
                url: `${API_ENDPOINTS.testimonials}/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Testimonial", id }],
        }),
        createTestimonial: builder.mutation<Testimonial, FormData>({
            query: (body) => ({
                url: API_ENDPOINTS.testimonials,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Testimonial"],
        }),
        updateTestimonial: builder.mutation<Testimonial, { id: string; data: FormData }>({
            query: ({ id, data }) => ({
                url: `${API_ENDPOINTS.testimonials}/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Testimonial", id }, "Testimonial"],
        }),
        deleteTestimonial: builder.mutation<void, string>({ // Changed to string
            query: (id) => ({
                url: `${API_ENDPOINTS.testimonials}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Testimonial"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetTestimonialsQuery,
    useGetTestimonialByIdQuery,
    useCreateTestimonialMutation,
    useUpdateTestimonialMutation,
    useDeleteTestimonialMutation,
} = testimonialApi;
