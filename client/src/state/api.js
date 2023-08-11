// USING REDUX TOOLKIT FORM THE STATE MANAGEMENT
// ALSO USING REDUX QUERIES FOR SIMPLE API CALLS
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// function that will call the API
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: [],
  endpoints: (build) => ({
    // to call the post request /text
    // We are sending the form data using this API to the backend
    postAiText: build.mutation({
      query: (payload) => ({
        url: "openai/text",
        method: "POST",
        body: payload,
      }),
    }),

    // This post request is only for the AI assistent to give
    // the post code snippets in the output
    postAiCode: build.mutation({
      query: (payload) => ({
        url: "openai/code",
        method: "POST",
        body: payload,
      }),
    }),

    postAiAssist: build.mutation({
      query: (payload) => ({
        url: "openai/assist",
        method: "POST",
        body: payload,
      }),
    }),
    postLogin: build.mutation({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    postSignUp: build.mutation({
      query: (payload) => ({
        url: "auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  usePostAiTextMutation,
  usePostAiCodeMutation,
  usePostAiAssistMutation,
  usePostLoginMutation,
  usePostSignUpMutation,
} = api;
