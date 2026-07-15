import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken, removeAuthToken } from "@/lib/utils/TokenHelper";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getAuthToken();

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    // Let fetchBaseQuery auto-detect Content-Type (JSON vs FormData)
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Clear cookies/tokens
    removeAuthToken();

    // Redirect to login if on client side
    if (typeof window !== "undefined") {
      window.location.href = "/login";
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
  ],
  endpoints: () => ({}),
});
