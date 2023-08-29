import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authApi} from "./services/authService";
import {categories} from "./services/categories";
import {articles} from "./services/articles";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categories.reducerPath]: categories.reducer,
    [articles.reducerPath]: articles.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    authApi.middleware,
    categories.middleware,
    articles.middleware,
  ])
})

setupListeners(store.dispatch)
export default store
