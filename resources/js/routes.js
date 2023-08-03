import {createBrowserRouter} from "react-router-dom"
import {Dashboard} from "./pages/Dashboard";
import {Login} from "./pages/Login";

const routes = createBrowserRouter([
  { path: '/', element: <Dashboard />},
  { path: '/login', element: <Login /> }
])

export default routes
