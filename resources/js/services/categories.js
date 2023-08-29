import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import i18n from "../i18n";
const baseUrl = process.env.MIX_APP_URL
export const categories = createApi({
    reducerPath: "categories",
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
    tagTypes: ["Categories","Articles"],
    endpoints: builder => ({
        getCategories: builder.query({
            query: (page) => ({
              url: `/api/categories?page=${page}`,
              method: 'GET'
            }),
            providesTags: result => result ? [
              ...result.data.map(({id})=>({type: 'Categories',id})),
              {type: 'Categories', id: 'PARTIAL-LIST'}
            ] : [{type: 'Categories', id: 'PARTIAL-LIST'}]
        }),
        getCategory: builder.query({
            query: (id) => `/api/categories/${id}`,
            providesTags: result => [{type: 'Categories', id: result.id}]
        }),
        addCategory: builder.mutation({
            query: (body) => ({
                url: `/api/categories`,
                method: "POST",
                body
            }),
            invalidatesTags: [{ type: 'Categories', id: 'PARTIAL-LIST' }]
        }),
        updateCategory: builder.mutation({
            query: ({id, body}) => ({
                url: `/api/categories/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: r => [{type: 'Categories', id: r.id}]
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/api/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: r => [{ type: 'Categories', id: r.id }]
        }),
        getCategoryArticles: builder.query({
            query: ({id, page}) => `/api/categories/${id}/articles?page=${page}`,
            providesTags: result => result ? [
                ...result.data.map(({id})=>({type: 'Articles',id})),
                {type: 'Articles', id: 'PARTIAL-LIST'}
            ] : [{type: 'Articles', id: 'PARTIAL-LIST'}]
        }),
    })
})

export const {
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useGetCategoryArticlesQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categories
