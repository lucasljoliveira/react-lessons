import { useContext } from "react"
import { StoreContext } from "../store/StoreContext"
import Button from "./UI/Button"


export default function Header({handleCartButtonClick}) {
    const { cart } = useContext(StoreContext) 

    return (
        <header id="main-header">
            <div id="title">
                <img src="logo.jpg" className=""/>
                <h1>REACTFOOD</h1>
            </div>
            <nav>
                <Button textOnly={true} onClick={handleCartButtonClick}>Cart({cart.items.length})</Button>
            </nav>
        </header>
    )
}
