import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../config/setting";
import { clearToken } from "../state";

const protectedBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as {
      state: {
        token: string | null;
      };
    };

    const token = state.state.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
// Used specifically for /auth/session
const sessionBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // 1. Normal protected request
  let result = await protectedBaseQuery(args, api, extraOptions);

  // 2. Token expired / unauthorized
  if (result.error?.status === 401) {
    // 3. Check session using cookie
    const sessionResult = await sessionBaseQuery(
      {
        url: "/auth/restore",
        method: "GET",
      },
      api,
      extraOptions,
    );

    // 4. Session is valid
    if (!sessionResult.error) {
      // Retry original protected request
      result = await protectedBaseQuery(args, api, extraOptions);
    } else {
      // Session is invalid
      api.dispatch(clearToken());
    }
  }

  return result;
};

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: [],
});

export default baseApi;
