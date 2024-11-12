import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";


export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch("https://lucastest-5de25-default-rtdb.firebaseio.com/cart.json", {method: "GET"})
            if (!response.ok) {
                throw new Error("Fetching cart data failed.")
            }
            const data = await response.json();
            return data ;
        };

        try {
            const cartData = await fetchData();
            console.log(cartData)
            dispatch(cartActions.replaceCart(cartData || {items: []}));

        } catch (error){
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error...",
                message: error.message || "Fetching cart data failed!"
            }))
        }

    }
}

// Action creator Thunk
export const sendCartData = (cartData) => {
    return async (dispatch) => {
        // Perform any action, async or anything else
        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Sending...",
            message: "Sending cart data!"
        }))

        const sendRequest = async () => {
            const response = await fetch("https://lucastest-5de25-default-rtdb.firebaseio.com/cart.json", {method: "PUT", body: JSON.stringify({items: cartData.items})})
            if (!response.ok) {
                throw new Error("Sending cart data failed.")
            }
        };

        try {
            await sendRequest();

            dispatch(uiActions.showNotification({
                status: "success",
                title: "Success...",
                message: "Sent cart data successfully!"
            }))

        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error...",
                message: error.message || "Sent cart data failed!"
            }))
        }
        
    }
}
