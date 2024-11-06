import { useContext, useState } from "react";
import { useImperativeHandle, useRef } from "react"
import useHttp from "../http";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";
import { StoreContext } from "../store/StoreContext";
import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./UI/Button";
import Error from "./Error";
import Modal from "./UI/Modal";
import { CartProgressContext } from "../store/CartContext";

const requestConfig = {
    method: "POST",
    headers: {"Content-Type": "application/json"}
}

export default function Checkout({...props}) {
    const { cart, clearItems } = useContext(StoreContext);
    const { progress: cartProgress, hideCheckout } = useContext(CartProgressContext);
    const [dataIsNotValid, setDataIsNotValid] = useState(false);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData: clearCheckoutData
    } = useHttp("http://localhost:3000/orders", requestConfig, null)


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
            setDataIsNotValid(true)
            return
        }
        setDataIsNotValid(false)

        const order = {
            order: {
                customer: customer,
                items: cart.items
            }
        }
        
        sendRequest(JSON.stringify(order))
    }

    function handleFinish(){
        clearItems()
        hideCheckout()
        clearCheckoutData()
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={hideCheckout} >Close</Button>
            <Button type="submit" >Submit Order</Button>
        </>
    )
    
    if (isSending){
        actions = <span>Sending data...</span>
    }

    if (error) {
        actions = <>
            <Error title="Failed to send order." message={error}></Error>
            <Button type="button" textOnly onClick={hideCheckout} >Close</Button>
        </>
    }


    if (data && !error) {
        return (
            <Modal open={cartProgress === "checkout"} onClose={handleFinish}>
                <h2>Success!!!</h2>
                <p>Your order was submitted successfully.</p>
                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleFinish} >Close</Button>
                </p>
            </Modal>
        )
    };

    return (
        <Modal open={cartProgress === "checkout"}>
            <h2>Checkout</h2>
            <p>Total Amount ${cart.items.reduce((partialSum, item) => partialSum + (item.quantity * item.meal.price), 0).toFixed(2)}</p>
            <form method="dialog" onSubmit={handleSubmitOrder}>
                <Input label="Full Name" type="text" id="name"/>
                <Input label="E-Mail Address" type="text" id="email"/>
                <Input label="Street" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>
                <p className="modal-actions">
                    {actions}
                </p>
                <div className="control-error">
                    {dataIsNotValid && <p>Check the inputs and make sure that everything is correct.</p>}
                </div>
            </form>
        </Modal>
    )
}
