import {createBrowserRouter} from "react-router-dom"
import {Dashboard} from "./pages/Dashboard";
import {Login} from "./pages/Login";
import {MainLayout} from "./components/MainLayout";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Dashboard /> }
    ]
  },
  { path: '/login', element: <Login /> }
])

export default routes
