import { createContext, useState } from "react";

export const CartProgressContext = createContext({
    progress: '', // cart or checkout
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});

export function CartProgressContextProvider({children}){
    const [cartProgress, setCartProgress] = useState("");

    function showCart(){
        setCartProgress("cart");
    };
    function hideCart(){
        setCartProgress("");
    };
    function showCheckout(){
        setCartProgress("checkout");
    };
    function hideCheckout(){
        setCartProgress("");
    };
    
    const cartProgressCtx = {
        progress: cartProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return <CartProgressContext.Provider value={cartProgressCtx}>{children}</CartProgressContext.Provider>
};

export default CartProgressContext;
