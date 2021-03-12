import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:9999",
    withCredentials: "include",
    headers: {
        Accept: "application/json"
    }
})

export default axiosInstance