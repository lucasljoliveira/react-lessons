import { useRef, useContext } from "react";
import { StoreContext } from "../store/StoreContext";
import Modal from "./UI/Modal";
import { CartProgressContext } from "../store/CartContext";


export default function Cart({...props}) {
    const cartProgressCtx = useContext(CartProgressContext)

    const {
        cart,
        addItemToCart,
        removeItemFromCart
    } = useContext(StoreContext);


    function goToCheckout(event){
        event.preventDefault();
        cartProgressCtx.showCheckout()
    }

    cart.items.sort((a, b) => {return a.id < b.id ? -1 : 1})

    return (
        <Modal className="cart" open={cartProgressCtx.progress === "cart"}>
            <h2>Your Cart</h2>
            <ul>
                {cart.items.map((item) => {
                    return <li className="cart-item" key={item.id}>
                        <p>{item.meal.name} - {item.quantity} x ${item.meal.price} = <strong>${(item.quantity * item.meal.price).toFixed(2)}</strong></p>
                        <p className="cart-item-actions">
                            <button onClick={() => removeItemFromCart(item.meal)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => addItemToCart(item.meal)}>+</button>
                        </p>
                    </li>
                })}
            </ul>
            <p className="cart-total">${cart.items.reduce((partialSum, item) => partialSum + (item.quantity * item.meal.price), 0).toFixed(2)}</p>
            <form onSubmit={goToCheckout}>
                <button type="button" className="text-button" onClick={cartProgressCtx.hideCart}><strong>Close</strong></button>
                { cart.items.length > 0 ? <button type="submit" className="button">Go to Checkout</button> : null}
            </form>
        </Modal>
    )
}
