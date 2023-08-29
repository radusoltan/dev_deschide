import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import i18n from "../i18n";
const baseUrl = process.env.MIX_APP_URL
export const articles = createApi({
	reducerPath: "articles",
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
	tagTypes: ["Articles"],
	endpoints: builder => ({
		getArticles: builder.query({
			query: (page) => ({
				url: `/api/articles?page=${page}`,
				method: 'GET'
			}),
			providesTags: result => result ? [
				...result.data.map(({id})=>({type: 'Articles',id})),
				{type: 'Articles', id: 'PARTIAL-LIST'}
			] : [{type: 'Categories', id: 'PARTIAL-LIST'}]
		}),
		getArticle: builder.query({
			query: (id) => `/api/articles/${id}`,
			providesTags: result => [{type: 'Articles', id: result.id}]
		}),
		addArticle: builder.mutation({
			query: ({category, values}) => ({
				url: `/api/category/${category}/add-article`,
				method: "POST",
				body: {...values}
			}),
			// invalidatesTags: response => response ? [{type: 'Articles', id: response.id}] : [{type: 'Articles', id: 'PARTIAL-LIST'}]
		}),
		updateArticle: builder.mutation({
			query: ({id, body}) => ({
				url: `/api/article/${id}`,
				method: "PATCH",
				body
			}),
			invalidatesTags: r => [{type: 'Articles', id: r.id}]
		}),
		deleteArticle: builder.mutation({
			query: (id) => ({
				url: `/api/articles/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: r => [{ type: 'Articles', id: r.id }]
		}),
	})
})

export const {
	useGetArticlesQuery,
	useGetArticleQuery,
	useAddArticleMutation,
	useUpdateArticleMutation,
	useDeleteArticleMutation,
} = articles
