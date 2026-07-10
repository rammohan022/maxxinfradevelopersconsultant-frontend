import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface DashboardLead {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}

export interface DashboardStats {
    totalLeads: number;
    totalBlogs: number;
    totalPracticeAreas: number;
    totalMembers: number;
    latestLeads: DashboardLead[];
}

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query<DashboardStats, void>({
            query: () => ({
                url: `${API_ENDPOINTS.dashboard}/stats`,
                method: "GET",
            }),
            providesTags: ["Lead", "Blog"], // Refetch stats when these entities mutate
        }),
    }),
    overrideExisting: false,
});

export const { useGetDashboardStatsQuery } = dashboardApi;
