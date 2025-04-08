import axios from 'axios'

const axiosInstance=axios.create({
    baseURL:import.meta.mode==="production"?"http://localhost:4000":"/api",
    withCredentials:true,
})

export default axiosInstance;