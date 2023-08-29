import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import i18n from "../i18n";

const baseUrl = process.env.MIX_APP_URL

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept-Language", i18n.language)
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "/api/user",
        method: "GET",
      })
    })
  }),
});

export const { useGetUserDetailsQuery } = authApi;
