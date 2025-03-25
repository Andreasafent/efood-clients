import { Category } from "./categories";

export type Store = {
    id: number;
    address: string;
    categories: Category[];
    cover: string;
    distance: number;
    latitude: string;
    longitude: string;
    logo: string;
    minimum_cart_value: string;
    name:string;
    phone: string;
    working_hours: WorkingHour[];


    shipping_price?: number; //Calculated for each user based on distance
}

export type WorkingHour = {
    start: string;
    end: string;
}