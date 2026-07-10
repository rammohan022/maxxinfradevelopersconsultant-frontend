import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface FAQ {
  question: string;
  answer: string;
}

export interface PracticeArea {
  id: string; // Changed to string for UUID support
  title: string;
  slug: string;
  innerImage?: string; // Renamed from heroImage to match backend sample
  overview?: string;
  approach?: string;
  quoteText?: string;
  quoteAuthor?: string;
  services?: string[];
  faqs?: FAQ[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePracticeAreaDto {
  title: string;
  slug: string;
  innerImage?: string;
  overview?: string;
  approach?: string;
  quoteText?: string;
  quoteAuthor?: string;
  services?: string[];
  faqs?: FAQ[];
}

export const practiceAreaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPracticeAreas: builder.query<PracticeArea[], void>({
      query: () => ({
        url: API_ENDPOINTS.practiceArea,
        method: "GET",
      }),
      providesTags: ["PracticeArea"],
    }),
    getPracticeAreaById: builder.query<PracticeArea, string>({ // Changed ID to string
      query: (id) => ({
        url: `${API_ENDPOINTS.practiceArea}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "PracticeArea", id }],
    }),
    createPracticeArea: builder.mutation<PracticeArea, FormData>({
      query: (body) => ({
        url: API_ENDPOINTS.practiceArea,
        method: "POST",
        body,
      }),
      invalidatesTags: ["PracticeArea"],
    }),
    updatePracticeArea: builder.mutation<PracticeArea, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.practiceArea}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "PracticeArea", id }, "PracticeArea"],
    }),
    deletePracticeArea: builder.mutation<void, string>({ // Changed ID to string
      query: (id) => ({
        url: `${API_ENDPOINTS.practiceArea}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PracticeArea"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPracticeAreasQuery,
  useGetPracticeAreaByIdQuery,
  useCreatePracticeAreaMutation,
  useUpdatePracticeAreaMutation,
  useDeletePracticeAreaMutation,
} = practiceAreaApi;
