import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Store } from "../../types/stores";
import { useCartStore } from "../../context/CartStore";

type Props = {
    open: boolean;
    store: Store;
    setOpen: (value: boolean) => void;
    onOpenShippingMethod: () => void;
}

export function StoreCartSummaryDialog({ open, setOpen, store, onOpenShippingMethod }: Props) {


    const shippingMethod = useCartStore(state => state.selectStore(+store.id)?.shippingMethod);

    return (
        <Dialog
            open={open}
            onClose={setOpen}
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
                            className="flex justify-start items-center p-4 w-full"
                            style={{ top: 0 }}
                        >
                            <button
                                className="btn btn-circle size-8"
                                onClick={() => setOpen(false)}
                            >
                                <ChevronLeftIcon className="size-4" />
                            </button>
                        </div>
                        <div className="p-4">
                            <h1 className="font-bold text-2xl">Cart</h1>
                            <a
                                href="javascript:void(0)"
                                className="flex items-center gap-2"
                                onClick={()=> onOpenShippingMethod()}
                            >
                                <span className="text-xs capitalize">{shippingMethod}: 10' - 20'</span>
                                <ChevronDownIcon className="size-3" />
                            </a>

                        </div>
                        {/* <Link to={"/stores/" + store?.id + "/checkout"}>
                            <button
                                className="btn btn-lg btn-success btn-block text-white p-2 grid grid-cols-3"
                                onClick={() => setOpenCartSummary(true)}
                            >
                                <div className="col-span-1 text-start">
                                    <span className="inline-block p-1 min-w-[28px] font-bold text-black text-center rounded-lg bg-white text-sm">
                                        {
                                            cartProducts.reduce((total, product) => {
                                                return total + product.quantity;
                                            }, 0)
                                        }
                                    </span>
                                </div>
                                <div className="col-span-1 font-bold text-lg text-black text-center">Cart</div>
                                <div className="col-span-1 font-bold text-black text-end">
                                    {
                                        cartProducts.reduce((total, product) => {
                                            return total + (product.quantity * product.product.price);
                                        }, 0)
                                    }€
                                </div>
                            </button>
                        </Link> */}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}