import { Category } from "./categories";
import { BaseResponse } from "./helpers";
import { ProductCategory } from "./products";
import { PaymentMethod, ShippingMethod } from "./stores";

export type Order = {

};

export type OrderCreatePayload = {
    address_id: number,
    store_id: number,
    payment_method: PaymentMethod,
    shipping_method: ShippingMethod,
    products:{
        product_id: number,
        quantity: number,
        note?: string,
    }[],
    note?: string,
    tip?: number,
    coupon_code?: null | string,
}

export type OrderCreateResponse = BaseResponse<{
    order: Order;
    viva_redirect_url: string;
}>

