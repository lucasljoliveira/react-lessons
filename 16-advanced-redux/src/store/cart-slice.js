import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = { items: [], changed: false }

const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {
        addItem(state, action) {
            const added_item = action.payload
            const cartItemIndex = state.items.findIndex(item => item.id === added_item.id)
            state.changed = true
            if (cartItemIndex !== -1){
                state.items[cartItemIndex].quantity += 1
            } else {
                state.items.push(
                    {
                        ...added_item,
                        quantity: 1
                    }
                )
            }
        },
        removeItem(state, action) {
            const removed_item = action.payload
            const cartItemIndex = state.items.findIndex(item => item.id === removed_item.id)
            state.changed = true
            
            if (cartItemIndex !== -1 && state.items[cartItemIndex].quantity > 1){
                state.items[cartItemIndex].quantity -= 1
            } else if (cartItemIndex !== -1 && state.items[cartItemIndex].quantity === 1) {
                state.items = state.items.filter(item => item.id !== removed_item.id)
            }
        },
        replaceCart(state, action) {
            state.items = action.payload.items;
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
