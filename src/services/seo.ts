import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface CreateSeoDto {
  pageName: string;
  pagePath: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  robots?: string;
  structuredData?: string;
  customHeadTags?: string;
}

export interface SeoSettings extends CreateSeoDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeoGlobalSettings {
  id: string;
  siteName: string;
  siteUrl: string;
  gaMeasurementId?: string;
  gtmId?: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  facebookPixelId?: string;
  twitterHandle?: string;
  robotsTxtContent?: string;
  llmsTxtContent?: string;
  headScripts?: string;
  bodyScripts?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSeoRedirectDto {
  sourcePath: string;
  targetPath: string;
  statusCode?: number;
  isActive?: boolean;
}

export interface SeoRedirect extends CreateSeoRedirectDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const seoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSeoSettings: builder.query<SeoSettings[], void>({
      query: () => ({
        url: API_ENDPOINTS.seo,
        method: "GET",
      }),
      providesTags: ["SeoSettings"],
    }),
    getSeoByPath: builder.query<SeoSettings, string>({
      query: (path) => ({
        url: `${API_ENDPOINTS.seo}/by-path`,
        method: "GET",
        params: { path },
      }),
      providesTags: (result, error, path) => [{ type: "SeoSettings", id: path }, "SeoSettings"],
    }),
    getSeoById: builder.query<SeoSettings, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.seo}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "SeoSettings", id }],
    }),
    createSeo: builder.mutation<SeoSettings, CreateSeoDto>({
      query: (body) => ({
        url: API_ENDPOINTS.seo,
        method: "POST",
        body,
      }),
      invalidatesTags: ["SeoSettings"],
    }),
    updateSeo: builder.mutation<SeoSettings, { id: string; data: Partial<CreateSeoDto> }>({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.seo}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["SeoSettings", { type: "SeoSettings", id }],
    }),
    deleteSeo: builder.mutation<void, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.seo}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SeoSettings"],
    }),

    // Global Settings
    getGlobalSeo: builder.query<SeoGlobalSettings, void>({
      query: () => ({
        url: `${API_ENDPOINTS.seo}/global`,
        method: "GET",
      }),
      providesTags: ["SeoSettings"],
    }),
    updateGlobalSeo: builder.mutation<SeoGlobalSettings, Partial<SeoGlobalSettings>>({
      query: (body) => ({
        url: `${API_ENDPOINTS.seo}/global`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["SeoSettings"],
    }),

    // Redirects
    getSeoRedirects: builder.query<SeoRedirect[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.seo}/redirects`,
        method: "GET",
      }),
      providesTags: ["SeoSettings"],
    }),
    getActiveSeoRedirects: builder.query<SeoRedirect[], void>({
      query: () => ({
        url: `${API_ENDPOINTS.seo}/redirects/active`,
        method: "GET",
      }),
      providesTags: ["SeoSettings"],
    }),
    createSeoRedirect: builder.mutation<SeoRedirect, CreateSeoRedirectDto>({
      query: (body) => ({
        url: `${API_ENDPOINTS.seo}/redirects`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["SeoSettings"],
    }),
    updateSeoRedirect: builder.mutation<SeoRedirect, { id: string; data: Partial<CreateSeoRedirectDto> }>({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.seo}/redirects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SeoSettings"],
    }),
    deleteSeoRedirect: builder.mutation<void, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.seo}/redirects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SeoSettings"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSeoSettingsQuery,
  useGetSeoByPathQuery,
  useGetSeoByIdQuery,
  useCreateSeoMutation,
  useUpdateSeoMutation,
  useDeleteSeoMutation,
  useGetGlobalSeoQuery,
  useUpdateGlobalSeoMutation,
  useGetSeoRedirectsQuery,
  useGetActiveSeoRedirectsQuery,
  useCreateSeoRedirectMutation,
  useUpdateSeoRedirectMutation,
  useDeleteSeoRedirectMutation,
} = seoApi;
