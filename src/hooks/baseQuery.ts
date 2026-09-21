import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken, removeAuthToken } from "@/lib/utils/TokenHelper";
import toast from "react-hot-toast";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3003/",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = getAuthToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;
    const errorData: any = result.error.data;

    let errorMessage = "An unexpected error occurred.";

    if (errorData) {
      if (typeof errorData.message === "string") {
        errorMessage = errorData.message;
      } else if (Array.isArray(errorData.message)) {
        errorMessage = errorData.message.join("; ");
      } else if (typeof errorData.error === "string") {
        errorMessage = errorData.error;
      }
    } else if ("error" in result.error && typeof (result.error as any).error === "string") {
      errorMessage = (result.error as any).error;
    }

    // Log to console for debugging
    console.error(`[API Request Error ${status}]`, {
      endpoint: typeof args === "string" ? args : args.url,
      method: typeof args === "string" ? "GET" : args.method || "GET",
      status,
      message: errorMessage,
      rawError: result.error,
    });

    if (status === 401) {
      removeAuthToken();
      if (typeof window !== "undefined") {
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
      }
    } else if (status !== "FETCH_ERROR" && typeof window !== "undefined") {
      // Auto toast error for mutating requests or API failures
      const isMutation = typeof args === "object" && args.method && args.method !== "GET";
      if (isMutation) {
        toast.error(`Error (${status}): ${errorMessage}`);
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Blog",
    "Lead",
    "Member",
    "Service",
    "Career",
    "Testimonial",
    "User",
    "Legal",
    "Profile",
    "JobApplication",
    "WebsiteLink",
    "ServiceCategory",
    "BlogCategory",
    "SeoSettings",
    "SiteSettings",
    "Banner",
    "Media",
    "Pdf",
    "ActivityLog",
    "HrResource",
    "HrResourceCategory",
    "Partner",
  ],
  endpoints: () => ({}),
});
