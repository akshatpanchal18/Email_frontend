import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../config/setting";
interface InitializeResponse {
  success: boolean;
  message: string;
  data: {
    status: "anonymous" | "authenticated";
    token?: string;
    user?: {
      id: string;
      email: string;
    };
  };
}
const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["INIT"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
    initialize: builder.query<InitializeResponse["data"], void>({
      query: () => ({ url: "/auth/init", method: "GET" }),
      providesTags: ["INIT"],
      transformResponse: (response: InitializeResponse) => response.data,
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["INIT"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useInitializeQuery,
  useLazyInitializeQuery,
  useLogoutMutation,
} = authApi;

export default authApi;
