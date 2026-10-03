import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface ComplianceServiceItem {
  id: string;
  title: string;
  slug?: string;
  desc: string;
  image?: string;
  link?: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateComplianceServiceDto {
  title: string;
  slug?: string;
  desc: string;
  image?: string;
  link?: string;
  order?: number;
  isActive?: boolean;
}

export const complianceServicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComplianceServices: builder.query<ComplianceServiceItem[], void>({
      query: () => ({
        url: API_ENDPOINTS.complianceServices,
        method: "GET",
      }),
      providesTags: ["ComplianceService"],
    }),
    getComplianceServicesAdmin: builder.query<ComplianceServiceItem[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.complianceServices}/admin/all`,
        method: "GET",
      }),
      providesTags: ["ComplianceService"],
    }),
    getComplianceServiceById: builder.query<ComplianceServiceItem, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.complianceServices}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "ComplianceService", id }],
    }),
    createComplianceService: builder.mutation<ComplianceServiceItem, CreateComplianceServiceDto>({
      query: (body) => ({
        url: API_ENDPOINTS.complianceServices,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ComplianceService"],
    }),
    updateComplianceService: builder.mutation<
      ComplianceServiceItem,
      { id: string; data: Partial<CreateComplianceServiceDto> }
    >({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.complianceServices}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "ComplianceService",
        { type: "ComplianceService", id },
      ],
    }),
    deleteComplianceService: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.complianceServices}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ComplianceService"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetComplianceServicesQuery,
  useGetComplianceServicesAdminQuery,
  useGetComplianceServiceByIdQuery,
  useCreateComplianceServiceMutation,
  useUpdateComplianceServiceMutation,
  useDeleteComplianceServiceMutation,
} = complianceServicesApi;
