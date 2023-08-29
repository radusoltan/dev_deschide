import Axios from 'axios'
// import * as https from "https";

const axios = Axios.create({
    baseURL: process.env.MIX_APP_URL + '/api',
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      "Accept": "application/json",
      // "Accept-Language": i18n.language
    },
    withCredentials: true,
    // httpAgent: new https.Agent({
    //   rejectUnauthorized: false
    // }),
});

export default axios;
