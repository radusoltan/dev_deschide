import {createBrowserRouter} from "react-router-dom"
import {Dashboard} from "./pages/Dashboard";
import {Login} from "./pages/Login";
import {MainLayout} from "./components/MainLayout";
import {Categories} from "./pages/content/categories";
import {Articles} from "./pages/content/articles";
import {Users} from "./pages/management/users";
import {Roles} from "./pages/management/roles";
import {Permissions} from "./pages/management/permissions";
import {Category} from "./pages/content/categories/category";
import {Article} from "./pages/content/articles/article";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/content/categories', element: <Categories /> },
      { path: '/content/category/:id', element: <Category /> },
      { path: '/content/articles', element: <Articles /> },
      { path: '/content/article/:id', element: <Article /> },
      { path: "/management/users", element: <Users /> },
      { path: "/management/roles", element: <Roles /> },
      { path: "/management/permissions", element: <Permissions />}
    ]
  },
  { path: '/login', element: <Login /> }
])

export default routes
