import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { CategoriesResponse, Category } from "../types/categories";

function Stores(){
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(()=>{
        axiosInstance.get<CategoriesResponse>("/client/categories")
            .then((response)=>{
                if(!response.data.success){
                    return;
                }
                setCategories(response.data.data.categories);
            })
    })
    return 'Stores';
}

export default Stores;