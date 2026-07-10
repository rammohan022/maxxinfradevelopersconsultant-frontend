import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface JobApplication {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    resume: string; // URL to the resume file
    message?: string;
    jobId: string;
    status?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateJobApplicationDto {
    fullName: string;
    email: string;
    phoneNumber: string;
    resume: File;
    message?: string;
    jobId: string;
}

export const jobApplicationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobApplications: builder.query<JobApplication[], void>({
            query: () => ({
                url: API_ENDPOINTS.jobapplication,
                method: "GET",
            }),
            providesTags: ["JobApplication"],
        }),
        getJobApplicationById: builder.query<JobApplication, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.jobapplication}/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "JobApplication", id }],
        }),
        createJobApplication: builder.mutation<JobApplication, FormData>({
            query: (formData) => ({
                url: API_ENDPOINTS.jobapplication,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["JobApplication"],
        }),
        updateJobApplication: builder.mutation<JobApplication, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `${API_ENDPOINTS.jobapplication}/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => ["JobApplication", { type: "JobApplication", id }],
        }),
        deleteJobApplication: builder.mutation<void, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.jobapplication}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["JobApplication"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetJobApplicationsQuery,
    useGetJobApplicationByIdQuery,
    useCreateJobApplicationMutation,
    useUpdateJobApplicationMutation,
    useDeleteJobApplicationMutation,
} = jobApplicationApi;
