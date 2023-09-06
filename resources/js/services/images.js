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
	tagTypes: ["Images","Thumbnails", "Renditions"],
	endpoints: builder => ({
		getImagesByArticle: builder.query({
			query: (id) => ({
				url: `/api/articles/${id}/images`,
				method: 'GET'
			}),
			providesTags: result => result ? [
        ...result.map(({id}) => ({type: 'Images', id})),
        {type: 'Images', id: 'LIST'}
			] : [{type: 'Images', id: 'LIST'}]
		}),
		uploadArticleImages: builder.mutation({
			query: ({id, body}) => ({
				url: `/api/articles/${id}/images`,
				method: 'POST',
				body
			}),
      invalidatesTags: r => r ? [
        ...r.map(({id}) => ({type: 'Images', id})),
        {type: 'Images', id: 'LIST'}
      ] : [{type: 'Images', id: 'LIST'}]
		}),
    detachImageFromArticle: builder.mutation({
      query: ({id, image}) => ({
        url: `/api/articles/${id}/images/${image}`,
        method: 'DELETE',
      }),
      invalidatesTags: r => r ? [
        ...r.map(({id}) => ({type: 'Images', id})),
        {type: 'Images', id: 'LIST'}
      ] : [{type: 'Images', id: 'LIST'}]
    }),
    setArticleMainImage: builder.mutation({
      query: ({id, image}) => ({
        url: `/api/articles/${id}/images/${image}/main`,
        method: 'PUT',
      }),
      invalidatesTags: r => r ? [
        ...r.map(({id}) => ({type: 'Images', id})),
        {type: 'Images', id: 'LIST'}
      ] : [{type: 'Images', id: 'LIST'}]
    }),
    getRenditions: builder.query({
      query: () => ({
        url: `/api/renditions`,
        method: 'GET'
      }),
      providesTags: result => ([
        ...result.map(({id}) => ({type: 'Renditions', id})),
        {type: 'Renditions', id: 'LIST'}
      ])
    }),
    getThumbnails: builder.query({
      query: (id) => ({
        url: `/api/images/${id}/thumbnails`,
        method: 'GET'
      }),
      providesTags: result => ([
        ...result.map(({id}) => ({type: 'Thumbnails', id})),
        {type: 'Thumbnails', id: 'LIST'}
      ])
    }),
    cropImage: builder.mutation({
      query: ({id, body}) => ({
        url: `/api/images/${id}/crop`,
        method: 'POST',
        body
      }),
      invalidatesTags: r => [
        {type: 'Thumbnails', id: r.id},
        {type: 'Thumbnails', id: 'LIST'}
      ]
      // invalidatesTags: r => ([
      //   ...r.map(({id})=> ({type: 'Thumbnails', id})),
      //   {type: 'Thumbnails', id: 'LIST'}
      // ])
    }),
    // getImage: builder.query({
    //   query: (image) => ({
    //     url: `/api/images/${image}`,
    //     method: 'GET'
    //   }),
    //   providesTags: result => ([
    //     ...result.data.map(({id}) => ({type: 'Images', id})),
    //   ])
    // })

	})

})

export const {
	useGetImagesByArticleQuery,
	useUploadArticleImagesMutation,
  useDetachImageFromArticleMutation,
  useSetArticleMainImageMutation,
  useGetRenditionsQuery,
  useGetThumbnailsQuery,
  useGetImageQuery,
  useCropImageMutation
} = images
