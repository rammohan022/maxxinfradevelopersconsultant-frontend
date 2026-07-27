import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface SiteSettings {
  id: string;
  siteName: string;
  logo?: string;
  favicon?: string;
  contactPhone: string;
  contactEmail: string;
  officeAddress: string;
  workingHours: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
  headerMenu?: { name: string; href: string }[];
  footerMenu?: { title: string; links: { name: string; href: string }[] }[];
}

export const siteSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSiteSettings: builder.query<SiteSettings, void>({
      query: () => ({
        url: API_ENDPOINTS.siteSettings,
        method: "GET",
      }),
      providesTags: ["SiteSettings"],
    }),
    updateSiteSettings: builder.mutation<SiteSettings, FormData | Partial<SiteSettings>>({
      query: (body) => ({
        url: API_ENDPOINTS.siteSettings,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SiteSettings"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSiteSettingsQuery, useUpdateSiteSettingsMutation } = siteSettingsApi;
