import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://efood-api.test/",
});

export default axiosInstance;