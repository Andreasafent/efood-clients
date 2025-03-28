import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { StoreResponse, Store as StoreType } from "../types/stores";
import axiosInstance from "../api/axiosInstance";
import { Product, ProductCategory } from "../types/products";
import {
    ChevronLeftIcon,
    InformationCircleIcon,
    MinusIcon,
    PlusIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import GoogleMap from "google-maps-react-markers";
import MapMarker from "../components/profile/MapMarker";
import { useCartStore } from "../context/CartStore";
import StoreProduct from "../components/stores/StoreProduct";

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

function Store() {
    const params = useParams();
    const items = useCartStore(state => state.items);
    const addItem = useCartStore(state => state.addItem);

    const [loading, setLoading] = useState(true);
    const [store, setStore] = useState<StoreType | null>();
    const [showBanner, setShowBanner] = useState(false);
    const [showStoreName, setShowStoreName] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [openInformation, setOpenInformation] = useState(false);

    const [openProduct, setOpenProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>();
    const [productQuantity, setProductQuantity] = useState(0);

    useEffect(() => {
        const id = params.id;

        axiosInstance
            .get<StoreResponse>("/client/stores/" + id)
            .then((response) => {
                if (!response.data.success) {
                    return;
                }
                // TODO: Handle this on the backend
                // response.data.data.store.product_categories = response.data.data.store.product_categories?.filter(pc => !!pc.products?.length);
                setStore(response.data.data.store);
            })
            .finally(() => {
                setLoading(false);
            });

        window.addEventListener("scroll", isSticky);
        return () => window.removeEventListener("scroll", isSticky);
    }, []);

    const isSticky = (e) => {
        const scrollTop = window.scrollY;
        setShowBanner(scrollTop >= 150);
        setShowStoreName(scrollTop >= 150 && scrollTop < 250);
        setShowCategories(scrollTop >= 250);
    };

    const scrollToCategory = (category: ProductCategory) => {
        const scrollTop =
            document.getElementById("category-" + category.id)?.offsetTop || 0;
        window.scrollTo({ top: scrollTop - 70, behavior: "smooth" });
    };

    const onSelectProduct = (product: Product) => {
        setOpenProduct(true);
        setSelectedProduct(product);

        const productInCart = items.find(item => item.product.id === product.id)
        setProductQuantity(productInCart?.quantity ?? 1);
    };

    const addToCart = () => {
        addItem(selectedProduct!, productQuantity);
        setOpenProduct(false);
    };

    const skeleton = (
        <div className="">
            <div className="hero relative h-[200px] skeleton"></div>
            <section className="p-4">
                <div className="flex justify-between items-center">
                    <h1 className="skeleton h-[28px] w-[120px]"></h1>
                    <div className="avatar">
                        <div className="skeleton w-[50px] ring-gray-300 ring-offset-base-100 rounded-full ring ring-offset-2"></div>
                    </div>
                </div>
                <div className="mt-3 truncate text-xs/5 text-gray-500 flex items-center gap-1 justify-end">
                    <span className="skeleton h-[20px] w-[120px]"></span>
                    <span className="skeleton h-[20px] w-[60px]"></span>
                </div>
                <div className="mt-4">
                    {[1, 2, 3].map((category) => (
                        <div key={category}>
                            <h2 className="skeleton h-[28px] w-[120px] mb-2"></h2>
                            <div className="border-b border-black"></div>
                            {[1, 2, 3].map((product, index, array) => (
                                <div
                                    key={product}
                                    className={`flex justify-between gap-2 py-3 ${index !== array.length - 1
                                        ? "border-b border-gray-200"
                                        : ""
                                        }`}
                                >
                                    <div className="flex flex-col gap-3">
                                        <h3 className="skeleton h-[20px] w-[100px]"></h3>
                                        <p className="skeleton h-[20px] w-[150px]"></p>
                                        <div className="skeleton h-[20px] w-[80px]"></div>
                                    </div>

                                    <div>
                                        <div className="avatar">
                                            <div className="w-24 rounded-xl skeleton"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );

    return loading ? (
        skeleton
    ) : (
        <main className="">
            <div
                className="hero relative h-[200px]"
                style={{
                    backgroundImage: `url(${store?.cover})`,
                }}
            >
                <div
                    className="flex justify-between items-center absolute p-4 w-full"
                    style={{ top: 0 }}
                >
                    <Link to={"/stores"}>
                        <button className="btn btn-circle size-8">
                            <ChevronLeftIcon className="size-4" />
                        </button>
                    </Link>
                    <button
                        className="btn btn-circle size-8"
                        onClick={() => setOpenInformation(true)}
                    >
                        <InformationCircleIcon className="size-4" />
                    </button>
                </div>
            </div>

            {showBanner && (
                <div
                    className="h-[64px] fixed p-3 w-full shadow-md shadow-gray-400 bg-white z-1"
                    style={{ top: 0 }}
                >
                    {showStoreName && (
                        <div className="h-full flex justify-center items-center font-bold text-xl">
                            {store?.name}
                        </div>
                    )}
                    {showCategories && (
                        <div className="flex flex-row gap-3 items-center overflow-x-auto">
                            {store?.product_categories?.map((category) => (
                                <button
                                    className="btn btn-ghost"
                                    key={category.id}
                                    onClick={() => scrollToCategory(category)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

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
                    {store?.product_categories?.map((category) => (
                        <div key={category.id} id={"category-" + category.id}>
                            <h2 className="font-bold text-lg pb-4 border-b border-black">
                                {category.name}
                            </h2>
                            {category.products?.map((product, index, array) => (
                                <div
                                    key={product.id}
                                    className={"pb-4" + (index !== array.length - 1 ? "border-b border-gray-200" : "" )}
                                >
                                    <StoreProduct
                                        product={product}
                                        onSelectProduct={onSelectProduct}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            <Dialog
                open={openInformation}
                onClose={setOpenInformation}
                className="relative z-10"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative min-w-[90%] transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 lg:max-w-[90%] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="flex justify-end">
                                <button
                                    className="btn btn-circle size-8"
                                    onClick={() => setOpenInformation(false)}
                                >
                                    <XMarkIcon className="size-4" />
                                </button>
                            </div>
                            <div className="">
                                <h2 className="font-bold text-md">
                                    Store Address
                                </h2>
                                <p className="text-gray-400">
                                    {store?.address}
                                </p>
                                <div className="">
                                    {openInformation && store && (
                                        <GoogleMap
                                            apiKey=""
                                            defaultCenter={{
                                                lat: +store?.latitude,
                                                lng: +store?.longitude,
                                            }}
                                            defaultZoom={5}
                                            options={{}}
                                            mapMinHeight="400px"
                                        >
                                            <MapMarker
                                                lat={store?.latitude}
                                                lng={store?.longitude}
                                                markerId={"address-location"}
                                            ></MapMarker>
                                        </GoogleMap>
                                    )}
                                </div>
                                {store?.working_hours?.length && (
                                    <>
                                        <h2 className="font-bold text-md mt-4">
                                            Working Hours
                                        </h2>
                                        <ul className="divide-y divide-gray-200">
                                            {store?.working_hours.map(
                                                (wh, index) => (
                                                    <li
                                                        key={index}
                                                        className="py-3 flex items-center justify-between"
                                                    >
                                                        <div className="font-bold text-sm">
                                                            {days[index]}
                                                        </div>
                                                        <div className="text-gray-500 text-sm">
                                                            {wh.start}- {wh.end}
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            <Dialog
                open={openProduct}
                onClose={setOpenProduct}
                className="relative z-10"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full h-full items-end justify-center text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative bg-gray-50 min-h-full h-full w-full transform text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div
                                className="hero relative h-[300px]"
                                style={{
                                    backgroundImage: `url(${selectedProduct?.main_image})`,
                                }}
                            >
                                <div
                                    className="flex justify-end items-center absolute p-4 w-full"
                                    style={{ top: 0 }}
                                >
                                    <button
                                        className="btn btn-circle size-8"
                                        onClick={() => setOpenProduct(false)}
                                    >
                                        <XMarkIcon className="size-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-b-2xl p-4 shadow-lg">
                                <h2 className="font-bold text-lg mb-2">
                                    {selectedProduct?.name}
                                </h2>
                                <p className="text-gray-500 text-xs mb-5">
                                    {selectedProduct?.description}
                                </p>
                                <div className="font-bold text-lg">
                                    {selectedProduct?.price.toFixed(2)}€
                                </div>
                            </div>
                            <div className="p-4">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">
                                        Notes
                                    </legend>
                                    <textarea
                                        className="textarea h-24 bg-white w-full"
                                        placeholder="Write your preferences..."
                                    ></textarea>
                                </fieldset>
                            </div>
                            <div className="bg-white p-4 shadow-lg flex justify-between gap-10">
                                <div className="flex justify-between items-center gap-3">
                                    <button
                                        disabled={productQuantity === 0}
                                        className="btn btn-square btn-sm"
                                        onClick={() => setProductQuantity(prev => prev > 0 ? prev - 1 : 0)}
                                    >
                                        <MinusIcon className="size-6" />
                                    </button>

                                    <span className="font-bold text-lg w-[25px] text-center">{productQuantity}</span>

                                    <button
                                        className="btn btn-square btn-sm"
                                        onClick={() => setProductQuantity(prev => prev + 1)}

                                    >
                                        <PlusIcon className="size-6" />
                                    </button>
                                </div>
                                <div className="grow">
                                    <button
                                        className="btn btn-md btn-success btn-block text-white"
                                        onClick={() => addToCart()}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </main>
    );
}

export default Store;
