import type { GetProfileResponse, ProfileData } from "../types/user";
import baseApi from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileData, void>({
      query: () => ({
        url: "/auth/my-details",
        method: "GET",
      }),

      transformResponse: (response: GetProfileResponse) => {
        return response.data;
      },
    }),
  }),
});
export const { useGetProfileQuery } = userApi;
