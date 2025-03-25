import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { StoreResponse, Store as StoreType } from "../types/stores";
import axiosInstance from "../api/axiosInstance";
import { ProductCategory } from "../types/products";
import { ChevronLeftIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

function Store() {
    const params = useParams();

    const [store, setStore] = useState<StoreType | null>();
    const [showBanner, setShowBanner] = useState(false);
    const [showStoreName, setShowStoreName] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    

    useEffect(() => {
        const id = params.id;

        axiosInstance.get<StoreResponse>("/client/stores/" + id)
            .then(response => {
                if (!response.data.success) {
                    return;
                }
                // TODO: Handle this on the backend
                // response.data.data.store.product_categories = response.data.data.store.product_categories?.filter(pc => !!pc.products?.length);
                setStore(response.data.data.store);
            })
            .finally()

        window.addEventListener('scroll', isSticky);
        return () => window.removeEventListener('scroll', isSticky);

    }, []);

    const isSticky = (e) => {
        const scrollTop = window.scrollY;
        setShowBanner(scrollTop >= 150);
        setShowStoreName(scrollTop >= 150 && scrollTop < 250);
        setShowCategories(scrollTop >= 250);
    }

    const scrollToCategory = (category: ProductCategory) => {
        const scrollTop = document.getElementById("category-" + category.id)?.offsetTop || 0;
        window.scrollTo({top: scrollTop - 70, behavior:'smooth'});
    }
    
    return (
        <main className="">
            <div
                className="hero relative h-[200px]"
                style={{
                    backgroundImage: `url(${store?.cover})`,
                }}
            >
                <div className="flex justify-between items-center absolute p-4 w-full" style={{top: 0}}>
                    <Link to={"/stores"}>
                        <button className="btn btn-circle size-8"                        >
                            <ChevronLeftIcon className="size-4"/>
                        </button>
                    </Link>
                    <button className="btn btn-circle size-8"                        >
                        <InformationCircleIcon className="size-4"/>
                    </button>
                </div>
            </div>

            {
                showBanner && 
                <div className="h-[64px] fixed p-3 w-full shadow-md shadow-gray-400 bg-white z-1" style={{top:0}}>
                    {
                        showStoreName&&
                        <div className="h-full flex justify-center items-center font-bold text-xl">{store?.name}</div>
                    }
                    {
                        showCategories && 
                            <div className="flex flex-row gap-3 items-center overflow-x-auto">
                                { 
                                    store?.product_categories?.map(category =>(
                                        <button 
                                            className="btn btn-ghost" 
                                            key={category.id}
                                            onClick={() => scrollToCategory(category)}
                                        >
                                                {category.name}
                                        </button>
                                    ))
                                }
                            </div>
                    }
                </div>
            }

            <section className="p-4">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-lg">{store?.name}</h1>
                    <div className="avatar">
                        <div className="w-[50px] ring-gray-300 ring-offset-base-100 rounded-full ring ring-offset-2">
                            <img src={store?.logo} />
                        </div>
                    </div>
                </div>
                <div className="mt-3 truncate text-xs/5 text-gray-500 flex items-center gap-1 justify-end">
                    <span>Minimum {store?.minimum_cart_value}€</span>
                    <span>•</span>
                    <span>Delivery {store?.shipping_price}€</span>
                </div>
                <div className="mt-4">
                    {
                        store?.product_categories?.map(category => (
                            <div key={category.id} id={"category-" + category.id}>
                                <h2 className="font-bold text-lg pb-4 border-b border-black">
                                    {category.name}
                                </h2>
                                {
                                    category.products?.map((product, index, array) => (
                                        <div key={product.id}
                                            className={`flex justify-between gap-2 py-3 ${index !== array.length - 1 ? "border-b border-gray-200" : ""}`}
                                        >
                                            <div className="flex flex-col gap-3">
                                                <h3 className="font-bold text-sm">
                                                    {product.name}
                                                </h3>
                                                {
                                                    product.description &&
                                                    <p className="text-gray-500 text-xs">{product.description}</p>
                                                }
                                                <div className="text-sm">
                                                    From {product.price}€
                                                </div>
                                            </div>

                                            <div>
                                                <div className="avatar">
                                                    <div className="w-24 rounded-xl">
                                                        <img src={product.main_image} alt={product.name} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </section>
        </main>
    );
}

export default Store;