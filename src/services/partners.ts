import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface CreatePartnerDto {
  name: string;
  logo?: string;
  websiteUrl?: string;
  order?: number;
  isActive?: boolean;
}

export interface Partner extends CreatePartnerDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const partnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPartners: builder.query<Partner[], void>({
      query: () => ({
        url: API_ENDPOINTS.partners,
        method: "GET",
      }),
      providesTags: ["Partner"],
    }),
    getAdminPartners: builder.query<Partner[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.partners}/admin/all`,
        method: "GET",
      }),
      providesTags: ["Partner"],
    }),
    getPartnerById: builder.query<Partner, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.partners}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Partner", id }],
    }),
    createPartner: builder.mutation<Partner, FormData | CreatePartnerDto>({
      query: (body) => ({
        url: API_ENDPOINTS.partners,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Partner"],
    }),
    updatePartner: builder.mutation<Partner, { id: string; data: FormData | Partial<CreatePartnerDto> }>({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.partners}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Partner", { type: "Partner", id }],
    }),
    deletePartner: builder.mutation<void, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.partners}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Partner"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPartnersQuery,
  useGetAdminPartnersQuery,
  useGetPartnerByIdQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnerApi;
