import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface TeamMember {
    id: string;
    fullName: string;
    designation: string;
    profileImage?: string;
    shortBio?: string;
    category?: string;
    practiceArea?: string;
    location?: string;
    displayOrder?: number;
    status: "Active" | "Inactive";
    createdAt: string;
    updatedAt: string;
}

export interface CreateMemberDto {
    name: string;
    designation: string;
    image?: string;
    bio?: string;
    category?: string;
    practiceArea?: string;
    location?: string;
    order?: number;
    status?: "Active" | "Inactive";
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
}

export const memberApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMembers: builder.query<TeamMember[], void>({
            query: () => ({
                url: API_ENDPOINTS.members,
                method: "GET",
            }),
            providesTags: ["Member"],
        }),
        getMemberById: builder.query<TeamMember, string>({ // Changed to string
            query: (id) => ({
                url: `${API_ENDPOINTS.members}/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Member", id }],
        }),
        createMember: builder.mutation<TeamMember, FormData>({
            query: (body) => ({
                url: API_ENDPOINTS.members,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Member"],
        }),
        updateMember: builder.mutation<TeamMember, { id: string; data: FormData }>({
            query: ({ id, data }) => ({
                url: `${API_ENDPOINTS.members}/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Member", id }, "Member"],
        }),
        deleteMember: builder.mutation<void, string>({ // Changed to string
            query: (id) => ({
                url: `${API_ENDPOINTS.members}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Member"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetMembersQuery,
    useGetMemberByIdQuery,
    useCreateMemberMutation,
    useUpdateMemberMutation,
    useDeleteMemberMutation,
} = memberApi;
