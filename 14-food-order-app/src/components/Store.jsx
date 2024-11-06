import Cart from "./Cart";
import Checkout from "./Checkout";
import Header from "./Header";
import Meals from "./Meals";

function Store() {

  return (
    <>
      <Header />
      <Meals />
      <Cart/>
      <Checkout/>
    </>
  );
}

export default Store;
