import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { CategoriesResponse, Category } from "../types/categories";
import CategoriesList from "../components/stores/CategoriesList";
import StoresList from "../components/stores/StoresList";
import { Store } from "../types/stores";
import StoresLayoutToggle from "../components/stores/StoresLayoutToggle";

function Stores(){
    const [categories, setCategories] = useState<Category[]>([]);
    const [stores, setStores] = useState<Store[]>([]);
    const [layout, setLayout] = useState<"list" | "grid">("grid");


    useEffect(()=>{
        axiosInstance.get<CategoriesResponse>("/client/categories")
            .then((response)=>{
                if(!response.data.success){
                    return;
                }
                setCategories(response.data.data.categories);
            });

        axiosInstance.get("/client/stores")
            .then((response)=>{
                if(!response.data.success){
                    return;
                }
                setStores(response.data.data.stores);
            });
    }, []);

    const onLayoutChange = (layout: "list" | "grid") => {
        setLayout(layout);
    };

    return (
        <main>
            <div className="">
                <CategoriesList categories = {categories} />
            </div>
            <div className="mt-4">
                <div className="grid grid-cols-2 items-center mb-4">
                    <div>
                        {
                            stores.length ? (
                                <h2 className="font-bold text-lg">{stores.length} Stores</h2>
                            ) : (
                                <div className="skeleton h-[28px] w-[160px]"></div>
                            )
                        }
                    </div>
                    <div className="text-end">
                        <StoresLayoutToggle 
                            layout={layout}
                            onLayoutChange={onLayoutChange}
                        />
                    </div>
                </div>
                    <StoresList layout={layout} stores={stores} />
            </div>
        </main>
    );
}

export default Stores;