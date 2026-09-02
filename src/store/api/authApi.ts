import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../config/setting";
interface SessionResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    type: "user" | "guest";
  };
  //   user: {
  //     id: string;
  //     email: string;
  //     name: string;
  //   };
}
const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),

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
    restoreSession: builder.query<SessionResponse, void>({
      query: () => ({
        url: "/auth/restore",
        method: "GET",
      }),
    }),
    logout: builder.query<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRestoreSessionQuery,
  useLazyRestoreSessionQuery,
  useLazyLogoutQuery,
} = authApi;

export default authApi;
