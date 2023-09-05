import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import i18n from "../i18n";

const baseUrl = process.env.MIX_APP_URL

export const images = createApi({
	reducerPath: "images",
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers, { getState }) => {
			const token = localStorage.getItem("token")
			// console.log('token', i18n.language)
			if (token) {
				headers.set("Authorization", `Bearer ${token}`)
			}
			headers.set("Accept-Language", i18n.language)
			return headers
		}
	}),
	tagTypes: ["Images","Thumbnails"],
	endpoints: builder => ({
		getImagesByArticle: builder.query({
			query: (id) => ({
				url: `/api/articles/${id}/images`,
				method: 'GET'
			}),
			providesTags: result => result ? [

			] : [{type: 'Images', id: 'LIST'}]
		}),
		uploadArticleImages: builder.mutation({
			query: ({id, body}) => ({
				url: `/api/articles/${id}/images`,
				method: 'POST',
				body
			})
		}),
	})

})

export const {
	useGetImagesByArticleQuery,
	useUploadArticleImagesMutation
} = images
