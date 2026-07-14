import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "@/lib/utils/TokenHelper";

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

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
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
  ],
  endpoints: () => ({}),
});
