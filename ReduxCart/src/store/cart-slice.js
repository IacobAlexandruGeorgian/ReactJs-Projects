import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
   name: 'cart',
   initialState: {
    items: [],
    totalQuantity: 0,
    changed: false
   },
   reducers: {
    addItemToCart(state, action) {
        const newItem = action.payload;
        const existinItem = state.items.find(item => item.id === newItem.id);
        state.changed = true;
        state.totalQuantity++;
        if (!existinItem) {
            state.items.push({id: newItem.id, price: newItem.price, quantity: 1, totalPrice: newItem.price, name: newItem.title});
        } else {
            existinItem.quantity++;
            existinItem.totalPrice = existinItem.totalPrice + newItem.price;
        }
    },
    removeItemFromCart(state, action) {
        const id = action.payload;
        const existinItem = state.items.find(item => item.id === id);
        state.changed = true;
        state.totalQuantity--;
        if (existinItem.quantity === 1) {
            state.items = state.items.filter(item => item.id !== id);
        } else {
            existinItem.quantity--;
            existinItem.totalPrice = existinItem.totalPrice - existinItem.price;
        }
    },
   } 
});

export const cartActions = cartSlice.actions;

export default cartSlice;