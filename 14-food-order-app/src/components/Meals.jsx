import { useContext } from "react"
import { StoreContext } from "../store/StoreContext"
import MealItem from "./MealItem"

export default function Meals() {
    const { meals } = useContext(StoreContext) 
    
    return (
        <div id="meals">
            { meals ? meals.map((meal) => {
            return <MealItem key={meal.id} meal={meal} />
            }) : <p>Loading all products! </p>}
        </div>
    )
}