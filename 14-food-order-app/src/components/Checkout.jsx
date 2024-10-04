import { useContext, useState } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react"
import { postOrder } from "../http";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";
import { StoreContext } from "../store/StoreContext";
import { createPortal } from "react-dom";

const Checkout = forwardRef(function Checkout({onFinishCheckout, ...props}, ref) {
    const checkoutRef = useRef();
    const { cart } = useContext(StoreContext);

    useImperativeHandle(ref, () => {
        return {
            open() {
                checkoutRef.current.showModal()
            }
        }
    });

    function handleSubmitOrder(event){
        event.preventDefault();

        const fd = new FormData(event.target);

        const customer = Object.fromEntries(fd.entries());
        const nameIsInvalid = !isNotEmpty(customer.name) || !hasMinLength(customer.name, 5);
        const cityIsInvalid = !isNotEmpty(customer.city);
        const streetIsInvalid = !isNotEmpty(customer.street);
        const emailIsInvalid = !isNotEmpty(customer.email) || !isEmail(customer.email);
        const postalCodeIsInvalid = !isNotEmpty(customer["postal-code"]);
        if (nameIsInvalid || cityIsInvalid || streetIsInvalid || emailIsInvalid || postalCodeIsInvalid){
            console.log("invalid")
            return
        }

        const order = {order: {
            customer: customer,
            items: cart.items
        }}
        console.log(order)

        postOrder(order);

        onFinishCheckout();

        checkoutRef.current.close()

    }

    return createPortal(
        <dialog ref={checkoutRef} className="modal">
            <h2>Checkout</h2>
            <p>Total Amount ${cart.items.reduce((partialSum, item) => partialSum + (item.quantity * item.meal.price), 0).toFixed(2)}</p>
            <form method="dialog" onSubmit={handleSubmitOrder}>
                <ol>
                    <li className="control">
                        <label htmlFor="name">Full Name</label>
                        <input id="name" name="name" required/>
                    </li>

                    <li className="control">
                        <label htmlFor="email">E-Mail Address</label>
                        <input id="email" name="email" required/>
                    </li>

                    <li className="control">
                        <label htmlFor="postalcode">Postal Code</label>
                        <input id="postal-code" name="postal-code" required/>
                    </li>
                    <li className="control">
                        <label htmlFor="street">Street</label>
                        <input id="street" name="street" required/>
                    </li>
                    <li className="control">
                        <label htmlFor="city">City</label>
                        <input id="city" name="city" required/>
                    </li>
                </ol>
                <div>
                    <button type="button" className="text-button" onClick={() => checkoutRef.current.close()}><strong>Close</strong></button>
                    <button type="submit" className="button">Submit Order</button>
                </div>
            </form>
        </dialog>, document.getElementById('modal')
    )
})

export default Checkout;
