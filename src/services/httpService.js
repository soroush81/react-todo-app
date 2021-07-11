import axios from 'axios'
import { toast } from 'react-toastify'
import logger from './logService'
import history from '../history';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }

    return config;
});

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500
    if (error.response.status === 401) {
        localStorage.removeItem("token")
        history.replace('/login');
    }
    if (!expectedError) {
        logger.log(error)
        toast.error("unexpected error occurred")
    }
    return Promise.reject(error);
})

const httpService = {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put,
    patch: axios.patch
}

export default httpService;