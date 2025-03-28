import { create } from 'zustand'
import { Product } from '../types/products'

type CartStore = {
    items: {
        product: Product
        quantity: number
    }[];
    addItem: (product: Product, quantity: number) => void
}

export const useCartStore = create<CartStore>((set) => ({
    items: [],
    addItem: (product: Product, quantity: number) => set((state)=>{
        const item = state.items.find(i => i.product.id === product.id);

        if(item){
            item.quantity = quantity;
            return state;
        }else{
            state.items.push({
                product, 
                quantity
            })
        }
        console.log(state.items)
        return state;
    })
}))

