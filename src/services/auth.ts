import { baseApi } from "@/hooks/baseQuery";
import { setAuthToken, removeAuthToken } from "@/lib/utils/TokenHelper";
import { API_ENDPOINTS } from "@/store/api";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  user: any;
}

export interface Profile {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
  profilePhoto?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
}

export interface UpdateProfileRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePhoto?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* =========================
       LOGIN
    ========================= */
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: API_ENDPOINTS.auth.login,
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.accessToken) {
            setAuthToken(data.accessToken); // save token in cookie
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    /* =========================
       LOGOUT
    ========================= */
    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_ENDPOINTS.auth.logout,
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          removeAuthToken(); // remove token from cookie
        }
      },
    }),

    /* =========================
       GET PROFILE
    ========================= */
    getProfile: builder.query<Profile, void>({
      query: () => ({
        url: API_ENDPOINTS.auth.profile,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    /* =========================
       GET ADMIN PROFILE (PUBLIC)
    ========================= */
    getAdminProfile: builder.query<Profile, void>({
      query: () => ({
        url: API_ENDPOINTS.auth.adminProfile,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    /* =========================
       UPDATE PROFILE
    ========================= */
    updateProfile: builder.mutation<Profile, FormData>({
      query: (body) => ({
        url: API_ENDPOINTS.auth.profile,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    /* =========================
       CHANGE PASSWORD
    ========================= */
    changePassword: builder.mutation<{ success: boolean; message: string }, ChangePasswordRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.auth.changePassword,
        method: "PUT",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useGetAdminProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;
