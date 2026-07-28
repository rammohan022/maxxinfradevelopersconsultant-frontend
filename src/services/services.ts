import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export type ServiceStatus = "Draft" | "Published";

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  category?: string;
  status?: ServiceStatus;
  position?: number;
  innerImage?: string;
  contentImage?: string;
  overview?: string;
  approach?: string;
  quoteText?: string;
  quoteAuthor?: string;
  services?: string[];
  faqs?: FAQ[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateServiceDto {
  title: string;
  slug: string;
  category?: string;
  status?: ServiceStatus;
  position?: number;
  innerImage?: string;
  contentImage?: string;
  overview?: string;
  approach?: string;
  quoteText?: string;
  quoteAuthor?: string;
  services?: string[];
  faqs?: FAQ[];
}

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<Service[], void>({
      query: () => ({
        url: API_ENDPOINTS.services,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    getServiceById: builder.query<Service, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.services}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Service", id }],
    }),
    createService: builder.mutation<Service, FormData>({
      query: (body) => ({
        url: API_ENDPOINTS.services,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation<Service, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.services}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Service", id }, "Service"],
    }),
    deleteService: builder.mutation<void, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.services}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
export type { PracticeArea as ServiceType } from './services'; // For backwards compatibility aliases if needed
export type PracticeArea = Service; // Alias for ease of migration
