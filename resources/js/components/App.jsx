import {Provider} from "react-redux"
import store from "../store"
import {RouterProvider} from "react-router-dom"
import routes from "../routes"
import i18n from "../i18n"
export const App = () => {
  i18n.changeLanguage(localStorage.getItem('i18nextLng'))
  return <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
}
