import { forwardRef, useImperativeHandle, useRef, useContext } from "react";
import { StoreContext } from "../store/StoreContext";
import { createPortal } from "react-dom";


const Cart = forwardRef(function Cart({openCheckout, ...props}, ref) {
    const modalRef = useRef();

    const {
        cart,
        addItemToCart,
        removeItemFromCart
    } = useContext(StoreContext);

    useImperativeHandle(
        ref, () => {return {
            open() {
                modalRef.current.showModal();
            }
        }}
    )

    cart.items.sort((a, b) => {return a.id < b.id ? -1 : 1})

    return createPortal(
        <dialog ref={modalRef} id="cart" className="modal cart">
            <h2>Your Cart</h2>
            <ul>
                {cart.items.map((item) => {
                    return <li className="cart-item" key={item.id}>
                        <p>{item.meal.name} - {item.quantity} x ${item.meal.price} = <strong>${(item.quantity * item.meal.price).toFixed(2)}</strong></p>
                        <div className="cart-item-actions">
                            <button onClick={() => removeItemFromCart(item.meal.id)}>-</button>
                            <p>{item.quantity}</p>
                            <button onClick={() => addItemToCart(item.meal.id)}>+</button>
                        </div>
                    </li>
                })}
            </ul>
            <p className="cart-total">${cart.items.reduce((partialSum, item) => partialSum + (item.quantity * item.meal.price), 0).toFixed(2)}</p>
            <form method=" " onSubmit={openCheckout}>
                <button type="button" className="text-button" onClick={() => modalRef.current.close()}><strong>Close</strong></button>
                <button type="submit" className="button">Go to Checkout</button>
            </form>
        </dialog>, document.getElementById('modal')
    )
})

export default Cart;
