import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Address, AddressResponse } from "../../types/addresses";
import axiosInstance from "../../api/axiosInstance";
import { BuildingOffice2Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import AddressForm from "../profile/AddressForm";

function Addresses(){
    const localStorageAddress = localStorage.getItem("address");
    
    const {user} = useAuth();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [openAddresses, setOpenAddresses] = useState(false);
    const [openCreateAddress, setOpenCreateAddress] = useState(false);


    useEffect(()=>{
        axiosInstance.get<AddressResponse>("/client/addresses")
            .then((response) => {
                if(!response.data.success){
                    return;
                }

                setAddresses(response.data.data.addresses);
                
                if(localStorageAddress) {
                    const address = response.data.data.addresses.find(address => address.id === parseInt(localStorageAddress))!;
                    if(address){
                        setSelectedAddress(address);
                    }
                };
            })
    }, []);

    const onSubmit = (data) =>{
        console.log(data);
    }

    return (
        <div className="">
            <button 
                className="btn btn-ghost flex justify-between items-center"
                onClick={()=>setOpenAddresses(true)}
            >
                <span>
                {
                    selectedAddress
                        ? selectedAddress.street
                        : "No address selected..."
                }
                </span>
                <ChevronDownIcon className="size-3"/>
            </button>

            <Dialog open={openAddresses} onClose={setOpenAddresses} className="relative z-10">
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
                            <div className="grid grid-cols-3 items-center">
                                <button 
                                    className="btn btn-circle"
                                    onClick={() => setOpenAddresses(false)}
                                >
                                    <XMarkIcon className="size-6"/>
                                </button>

                                <DialogTitle
                                    as="h3"
                                    className="text-base font-semibold text-gray-900 text-center"
                                >
                                    Addresses
                                </DialogTitle>

                                <div></div>
                            </div>
                            <div className="">
                                {
                                    addresses?.length ? (
                                        <div className="my-4 text-2xl text-center text-gray-400">No addresses yet...</div>
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOpenCreateAddress(true);
                                        setOpenAddresses(false); //
                                    }}
                                    className="inline-flex w-full justify-center btn btn-accent"
                                >
                                    Add new address
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            <Dialog open={openCreateAddress} onClose={setOpenCreateAddress} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 lg:max-w-[90%] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div>
                                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gray-100">
                                    <BuildingOffice2Icon
                                        aria-hidden="true"
                                        className="size-6 text-gray-600"
                                    />
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <DialogTitle
                                        as="h3"
                                        className="text-base font-semibold text-gray-900"
                                    >
                                        New Address
                                    </DialogTitle>
                                    {/* <div className="mt-2 hidden">                                        
                                        <GoogleMap
                                            apiKey=""
                                            defaultCenter={center}
                                            defaultZoom={5}
                                            options={{}}
                                            mapMinHeight="400px"
                                            onGoogleApiLoaded={onGoogleApiLoaded}
                                            onChange={onLocationChange}
                                        >
                                            <MapMarker
                                                lat={center.lat}
                                                lng={center.lng}
                                                markerId={"address-location"}
                                                draggable={true}
                                            ></MapMarker>
                                        </GoogleMap>
                                    </div> */}
                                    <div className="mt-2">
                                        <AddressForm onSubmit={onSubmit}/>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    onClick={() => setOpenCreateAddress(false)}
                                    className="inline-flex w-full justify-center btn btn-soft"
                                >
                                    Close
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default Addresses;