import axios from 'axios'

const axiosInstance=axios.create({
    baseURL:process.env.NODE_ENV==="production"?"http://localhost:4000":"/api",
    withCredentials:true,
})

export default axiosInstance;