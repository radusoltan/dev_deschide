import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.MIX_APP_URL + '/api',
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    withCredentials: true,
});

export default axios;
