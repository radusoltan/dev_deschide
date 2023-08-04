import axios from "../lib/axios"

const Auth = {
  login: async (credentials, success, error) => {
    try {
      const response = await axios.post("/login", credentials)
      success(response)

    } catch (e) {
      error(e)
    }
  },
  logout: async (success, error) => {
    try {
      const response = await axios.post("/logout",{},{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      success(response)

    } catch (e) {
      error(e)
    }
  }
}

export default Auth
