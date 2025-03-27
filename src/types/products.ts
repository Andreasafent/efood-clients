export type ProductCategory = {
    id: number;
    name: string;
    products?: Product[];
}

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    main_image: string;
}