import { memo, useContext } from "react";
import { StoreContext } from "../store/StoreContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";


const MealItem = memo(function MealItem({meal, ...props}) {
    const { addItemToCart } = useContext(StoreContext);

    return <li className="meal-item">
        <article>
            <img src={"http://localhost:3000/" + meal.image} alt={meal.name}/>
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                <p id="meal-item-description">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
                <Button onClick={() => addItemToCart(meal.id)} >AddToCart</Button>
            </p>
        </article>
    </li>
});

export default MealItem;