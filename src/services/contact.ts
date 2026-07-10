import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface CreateContactDto {
    fullName: string;
    email: string;
    phoneNumber: string;
    subject?: string;
    message: string;
}

export interface Contact extends CreateContactDto {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createContact: builder.mutation<Contact, CreateContactDto>({
            query: (body) => ({
                url: API_ENDPOINTS.contacts,
                method: "POST",
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useCreateContactMutation } = contactApi;
