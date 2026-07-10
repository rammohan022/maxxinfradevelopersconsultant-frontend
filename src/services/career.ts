import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface Career {
    id: string;
    title: string;
    department: string;
    location: string;
    jobType: "Full-time" | "Part-time" | "Internship";
    experience: string;
    salary?: string;
    description: string;
    requirements?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCareerDto {
    title: string;
    department: string;
    location: string;
    jobType: "Full-time" | "Part-time" | "Internship";
    experience: string;
    salary?: string;
    description: string;
    requirements?: string;
    isActive: boolean;
}

export const careerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCareers: builder.query<Career[], void>({
            query: () => ({
                url: API_ENDPOINTS.careers,
                method: "GET",
            }),
            providesTags: ["Career"],
        }),
        getCareerById: builder.query<Career, string>({ // Changed to string
            query: (id) => ({
                url: `${API_ENDPOINTS.careers}/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Career", id }],
        }),
        createCareer: builder.mutation<Career, CreateCareerDto>({
            query: (body) => ({
                url: API_ENDPOINTS.careers,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Career"],
        }),
        updateCareer: builder.mutation<Career, { id: string; data: Partial<CreateCareerDto> }>({ // Changed to string
            query: ({ id, data }) => ({
                url: `${API_ENDPOINTS.careers}/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => ["Career", { type: "Career", id }],
        }),
        deleteCareer: builder.mutation<void, string>({ // Changed to string
            query: (id) => ({
                url: `${API_ENDPOINTS.careers}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Career"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetCareersQuery,
    useGetCareerByIdQuery,
    useCreateCareerMutation,
    useUpdateCareerMutation,
    useDeleteCareerMutation,
} = careerApi;
