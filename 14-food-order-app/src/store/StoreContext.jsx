import { createContext, useReducer } from "react"; 
import useFetch from "../hooks/useFetch";
import { fetchMeals } from "../http";


export const StoreContext = createContext({
    cart: {
        items: [],
        customer: {}
    },
    meals: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItems: () => {}
})


function storeContextReducer(state, action) {
    let items = [...state.items];

    if (action.type === 'ADD_ITEM'){
        const meal_id = action.payload.id;
        
        const actualItem = items.find((item) => item.id === meal_id)
        if (actualItem) {
            const actualItemIndex = items.findIndex((item) => item.id == meal_id)
            items[actualItemIndex] = {
                ...actualItem,
                quantity: actualItem.quantity + 1
            }
        }
        else {
            const meals = [...action.payload.meals]
            const meal = meals.find((item) => item.id === meal_id)
            items.push({
                id: meal.id,
                meal: meal,
                quantity: 1
            })
        }
    }
    if (action.type === 'REMOVE_ITEM'){
        const meal_id = action.payload.id
        const actualItem = items.find((item) => item.id == meal_id)
        const actualItemIndex = items.findIndex((item) => item.id == meal_id)
        if (actualItem.quantity > 1){
            items[actualItemIndex] = {
                ...actualItem,
                quantity: actualItem.quantity -1
            }
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
    const {
        data: meals
      } = useFetch([], fetchMeals);

    const [storeState, storeStateDispatch] = useReducer(storeContextReducer, {items: []})

    function addItemToCart(id){
        storeStateDispatch({
            type: "ADD_ITEM",
            payload: {id: id, meals: meals}
        })
    }
    
    function removeItemFromCart(id){
        storeStateDispatch({
            type: "REMOVE_ITEM",
            payload: {id: id, meals: meals}
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
        meals: meals,
        addItemToCart,
        removeItemFromCart,
        clearItems
    }
    return <StoreContext.Provider value={context}>
        {children}
    </StoreContext.Provider>
}