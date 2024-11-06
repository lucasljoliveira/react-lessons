import { useContext } from "react"
import { StoreContext } from "../store/StoreContext"
import Button from "./UI/Button"
import { CartProgressContext } from "../store/CartContext"


export default function Header({handleCartButtonClick}) {
    const { cart } = useContext(StoreContext);
    const { showCart } = useContext(CartProgressContext);

    return (
        <header id="main-header">
            <div id="title">
                <img src="logo.jpg" className=""/>
                <h1>REACTFOOD</h1>
            </div>
            <nav>
                <Button textOnly={true} onClick={showCart}>Cart({cart.items.length})</Button>
            </nav>
        </header>
    )
}
