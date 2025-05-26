import axios from "axios";


const API = axios.create({
    baseURL: 'http://localhost:8000'
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // store.dispatch(logoutUser())
            window.location.href = '/login'  // Force navigation
        }
        return Promise.reject(error)
    }
)

export default API