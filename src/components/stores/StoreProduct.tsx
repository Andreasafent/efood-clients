import { PlusIcon } from "@heroicons/react/24/outline";
import { Product } from "../../types/products"

type Props = {
    product: Product,
    onSelectProduct: (product: Product) => void
}

function StoreProduct({ product, onSelectProduct }: Props) {
    return (

        <div
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className={`relative flex justify-between gap-2 py-3`}
        >
            <div className="flex flex-col gap-3">
                <h3 className="font-bold text-sm">
                    {product.name}
                </h3>
                {product.description && (
                    <p className="text-gray-500 text-xs">
                        {product.description}
                    </p>
                )}
                <div className="text-sm">
                    From {product.price}€
                </div>
            </div>

            <div>
                <div className="avatar">
                    <div className="w-26 rounded-xl">
                        <img
                            src={product.main_image}
                            alt={product.name}
                        />
                    </div>
                </div>
            </div>

            <button
                className="btn btn-success btn-square absolute size-8"
                style={{ right: "-.5rem", bottom: 0 }}
            >
                <PlusIcon className="size-6" />
            </button>
        </div>
    )
}

export default StoreProduct;