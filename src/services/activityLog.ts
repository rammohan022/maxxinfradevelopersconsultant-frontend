import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface ActivityLogItem {
  id: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  userRole?: string;
  action: string;
  module: string;
  description: string;
  ipAddress?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface ActivityLogsResponse {
  logs: ActivityLogItem[];
  total: number;
}

export const activityLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivityLogs: builder.query<
      ActivityLogsResponse,
      { search?: string; module?: string; action?: string; page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: API_ENDPOINTS.activityLogs,
        method: "GET",
        params: {
          search: params?.search || undefined,
          module: params?.module || undefined,
          action: params?.action || undefined,
          page: params?.page || 1,
          limit: params?.limit || 50,
        },
      }),
      providesTags: ["ActivityLog"],
    }),
    clearActivityLogs: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: `${API_ENDPOINTS.activityLogs}/clear`,
        method: "DELETE",
      }),
      invalidatesTags: ["ActivityLog"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetActivityLogsQuery, useClearActivityLogsMutation } = activityLogsApi;
