import { useContext, useRef } from "react";
import MealItem from "./MealItem";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { StoreContext } from "../store/StoreContext";
import Header from "./Header";
import Meals from "./Meals";

function Store() {
  const { cart, meals, clearItems } = useContext(StoreContext) 

  const cartDialog = useRef();
  const checkoutDialog = useRef();

  function handleCartButtonClick() {
    cartDialog.current.open()
  }

  function openCheckout(){
    checkoutDialog.current.open()
  }

  return (
    <>
      <Header handleCartButtonClick={handleCartButtonClick} />
      <Meals />
      <Cart ref={cartDialog} openCheckout={openCheckout}/>
      <Checkout ref={checkoutDialog} onFinishCheckout={clearItems}/>
    </>
  );
}

export default Store;
