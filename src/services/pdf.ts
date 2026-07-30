import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface CreatePdfDto {
    title: string;
    order?: number;
    fileUrl?: string;
}

export interface Pdf extends CreatePdfDto {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export const pdfApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPdfs: builder.query<Pdf[], void>({
            query: () => ({
                url: API_ENDPOINTS.pdfs,
                method: "GET",
            }),
            providesTags: ["Pdf"],
        }),
        getPdfById: builder.query<Pdf, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.pdfs}/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Pdf", id }],
        }),
        createPdf: builder.mutation<Pdf, FormData>({
            query: (formData) => ({
                url: API_ENDPOINTS.pdfs,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Pdf"],
        }),
        updatePdf: builder.mutation<Pdf, { id: string; data: FormData }>({
            query: ({ id, data }) => ({
                url: `${API_ENDPOINTS.pdfs}/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => ["Pdf", { type: "Pdf", id }],
        }),
        deletePdf: builder.mutation<void, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.pdfs}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Pdf"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetPdfsQuery,
    useGetPdfByIdQuery,
    useCreatePdfMutation,
    useUpdatePdfMutation,
    useDeletePdfMutation,
} = pdfApi;
