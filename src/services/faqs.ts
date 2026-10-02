import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface CreateFaqDto {
  question: string;
  answer: string;
  category?: string;
  order?: number;
  isActive?: boolean;
}

export interface Faq extends CreateFaqDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<Faq[], { category?: string } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.faqs,
        method: "GET",
        params: params?.category ? { category: params.category } : undefined,
      }),
      providesTags: ["Faq"],
    }),
    getAdminFaqs: builder.query<Faq[], { category?: string } | void>({
      query: (params) => ({
        url: `${API_ENDPOINTS.faqs}/admin/all`,
        method: "GET",
        params: params?.category ? { category: params.category } : undefined,
      }),
      providesTags: ["Faq"],
    }),
    getFaqById: builder.query<Faq, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.faqs}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Faq", id }],
    }),
    createFaq: builder.mutation<Faq, CreateFaqDto>({
      query: (body) => ({
        url: API_ENDPOINTS.faqs,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Faq"],
    }),
    updateFaq: builder.mutation<Faq, { id: string; data: Partial<CreateFaqDto> }>({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.faqs}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Faq", { type: "Faq", id }],
    }),
    deleteFaq: builder.mutation<void, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.faqs}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faq"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFaqsQuery,
  useGetAdminFaqsQuery,
  useGetFaqByIdQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
