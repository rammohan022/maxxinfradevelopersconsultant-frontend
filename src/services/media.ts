import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface MediaItem {
  id: string;
  filename: string;
  folder: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: string;
}

export const mediaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMediaFiles: builder.query<MediaItem[], { search?: string } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.media,
        method: "GET",
        params: params?.search ? { search: params.search } : undefined,
      }),
      providesTags: ["Media"],
    }),
    uploadMediaFile: builder.mutation<{ url: string; filename: string }, FormData>({
      query: (body) => ({
        url: `${API_ENDPOINTS.media}/upload`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Media"],
    }),
    deleteMediaFile: builder.mutation<void, { folder: string; filename: string }>({
      query: ({ folder, filename }) => ({
        url: `${API_ENDPOINTS.media}/${folder}/${filename}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Media"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMediaFilesQuery,
  useUploadMediaFileMutation,
  useDeleteMediaFileMutation,
} = mediaApi;
