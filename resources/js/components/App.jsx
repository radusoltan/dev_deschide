import {Provider} from "react-redux"
import store from "../store"
import {RouterProvider} from "react-router-dom"
import routes from "../routes"
export const App = () => {

  return <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
}
