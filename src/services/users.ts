import { baseApi } from "@/hooks/baseQuery";

export type UserRoleType = "admin" | "hr" | "editor" | "user";

export interface UserItem {
  id: string;
  email: string;
  name?: string;
  phoneNumber?: string;
  role: UserRoleType;
  permissions?: string[];
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  email: string;
  password?: string;
  name?: string;
  phoneNumber?: string;
  role: UserRoleType;
  permissions?: string[];
  isActive?: boolean;
}

export interface UpdateUserDto {
  name?: string;
  phoneNumber?: string;
  role?: UserRoleType;
  permissions?: string[];
  isActive?: boolean;
  password?: string;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserItem[], { role?: string; isActive?: boolean } | void>({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params: params ? { role: params.role, isActive: params.isActive } : undefined,
      }),
      providesTags: ["User"],
    }),
    createUser: builder.mutation<UserItem, CreateUserDto>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<UserItem, { id: string; data: UpdateUserDto }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
