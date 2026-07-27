import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface Banner {
  id: string;
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  position?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const bannersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query<Banner[], { activeOnly?: boolean } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.banners,
        method: "GET",
        params: params?.activeOnly ? { activeOnly: "true" } : undefined,
      }),
      providesTags: ["Banner"],
    }),
    createBanner: builder.mutation<Banner, FormData>({
      query: (body) => ({
        url: API_ENDPOINTS.banners,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Banner"],
    }),
    updateBanner: builder.mutation<Banner, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.banners}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Banner"],
    }),
    deleteBanner: builder.mutation<void, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.banners}/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannersApi;
