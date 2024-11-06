import { createContext, useReducer } from "react"; 

export const StoreContext = createContext({
    cart: {
        items: [],
        customer: {}
    },
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItems: () => {}
})


function storeContextReducer(state, action) {
    let items = [...state.items];

    if (action.type === 'ADD_ITEM'){
        const meal = action.payload.meal;
        
        const actualItem = items.find((item) => item.id === meal.id)
        if (actualItem) {
            const actualItemIndex = items.findIndex((item) => item.id == meal.id)
            items[actualItemIndex] = {
                ...actualItem,
                quantity: actualItem.quantity + 1
            }
        }
        else {
            const meal = action.payload.meal
            items.push({
                id: meal.id,
                meal: meal,
                quantity: 1
            })
        }
    }
    if (action.type === 'REMOVE_ITEM'){
        const meal = action.payload.meal
        const actualItem = items.find((item) => item.id == meal.id)
        const actualItemIndex = items.findIndex((item) => item.id == meal.id)
        if (actualItem.quantity > 1){
            items[actualItemIndex] = {
                ...actualItem,
                quantity: actualItem.quantity -1
            }
        }
        else if (actualItem.quantity === 1) {
            items = items.filter((item, index) => index !== actualItemIndex)
        }
        else {
            items.slice(actualItemIndex, 1)
        }
    }
    if (action.type === 'CLEAR_ITEMS'){
        items = [];
    }
    return {items: items}
}

export default function StoreContextProvider({ children }) {
    const [storeState, storeStateDispatch] = useReducer(storeContextReducer, {items: []})

    function addItemToCart(meal){
        storeStateDispatch({
            type: "ADD_ITEM",
            payload: {meal: meal}
        })
    }
    
    function removeItemFromCart(meal){
        storeStateDispatch({
            type: "REMOVE_ITEM",
            payload: {meal: meal}
        })
    }
    
    function clearItems(){
        storeStateDispatch({
            type: "CLEAR_ITEMS"
        })
    }


    const context = {
        cart: {
            items: storeState.items,
            customer: {}
        },
        addItemToCart,
        removeItemFromCart,
        clearItems
    }
    return <StoreContext.Provider value={context}>
        {children}
    </StoreContext.Provider>
}
