import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authApi} from "./services/authService";
import {categories} from "./services/categories";
import {articles} from "./services/articles";
import {images} from "./services/images";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categories.reducerPath]: categories.reducer,
    [articles.reducerPath]: articles.reducer,
    [images.reducerPath]: images.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    authApi.middleware,
    categories.middleware,
    articles.middleware,
    images.middleware,
  ])
})

setupListeners(store.dispatch)
export default store
