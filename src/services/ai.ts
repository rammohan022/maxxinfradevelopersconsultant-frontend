import { baseApi } from "@/hooks/baseQuery";
import { API_ENDPOINTS } from "@/store/api";

export interface BlogGenRequest {
  topic: string;
  keywords?: string;
  provider?: string;
}

export interface BlogGenResponse {
  title: string;
  excerpt: string;
  content: string;
}

export interface MetaDescRequest {
  title: string;
  content?: string;
  provider?: string;
}

export interface MetaDescResponse {
  metaDescription: string;
}

export interface SeoTitleRequest {
  topic: string;
  provider?: string;
}

export interface SeoTitleResponse {
  seoTitle: string;
}

export interface FaqGenRequest {
  topic: string;
  provider?: string;
}

export interface FaqGenResponse {
  faqs: { question: string; answer: string }[];
}

export interface AltTextRequest {
  imageContext: string;
  provider?: string;
}

export interface AltTextResponse {
  altText: string;
}

export interface RewriteRequest {
  text: string;
  tone?: string;
  provider?: string;
}

export interface RewriteResponse {
  rewrittenText: string;
}

export interface GrammarFixRequest {
  text: string;
  provider?: string;
}

export interface GrammarFixResponse {
  correctedText: string;
}

export const aiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateBlog: builder.mutation<BlogGenResponse, BlogGenRequest>({
      query: (body) => ({
        url: `${API_ENDPOINTS.ai}/blog-generator`,
        method: "POST",
        body,
      }),
    }),
    generateMetaDescription: builder.mutation<MetaDescResponse, MetaDescRequest>({
      query: (body) => ({
        url: `${API_ENDPOINTS.ai}/meta-description`,
        method: "POST",
        body,
      }),
    }),
    generateSeoTitle: builder.mutation<SeoTitleResponse, SeoTitleRequest>({
      query: (body) => ({
        url: `${API_ENDPOINTS.ai}/seo-title`,
        method: "POST",
        body,
      }),
    }),
    generateFaqs: builder.mutation<FaqGenResponse, FaqGenRequest>({
      query: (body) => ({
        url: `${API_ENDPOINTS.ai}/faq-generator`,
        method: "POST",
        body,
      }),
    }),
    generateAltText: builder.mutation<AltTextResponse, AltTextRequest>({
      query: (body) => ({
        url: `${API_ENDPOINTS.ai}/alt-text`,
        method: "POST",
        body,
      }),
    }),
    rewriteContent: builder.mutation<RewriteResponse, RewriteRequest>({
      query: (body) => ({
        url: `${API_ENDPOINTS.ai}/rewrite`,
        method: "POST",
        body,
      }),
    }),
    fixGrammar: builder.mutation<GrammarFixResponse, GrammarFixRequest>({
      query: (body) => ({
        url: `${API_ENDPOINTS.ai}/grammar-fix`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGenerateBlogMutation,
  useGenerateMetaDescriptionMutation,
  useGenerateSeoTitleMutation,
  useGenerateFaqsMutation,
  useGenerateAltTextMutation,
  useRewriteContentMutation,
  useFixGrammarMutation,
} = aiApi;
