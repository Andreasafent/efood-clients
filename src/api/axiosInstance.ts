import axios from "axios";
import { Address } from "../types/addresses";

const axiosInstance = axios.create({
    baseURL: "http://efood-api.test/",
});

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    const address = localStorage.getItem("address");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    if(address){
        const addressJson = JSON.parse(address) as Address;
        config.headers["X-Location"] = `${addressJson.latitude}, ${addressJson.longitude}`
    }

    return config;
})

export default axiosInstance;