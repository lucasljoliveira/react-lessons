import useHttp from "../http";
import Error from "./Error.jsx";
import MealItem from "./MealItem"

const requestConfig = {};

export default function Meals() {

    const {
        data: meals,
        isLoading: isFetching,
        error
    } = useHttp("http://localhost:3000/meals", requestConfig, []);

    if (isFetching) {
        return <p className="center">Loading products... </p>;
    }

    if (error) {
        return <Error title="Error While Loading Meals" message={error} />;
    }
    
    return (
        <div id="meals">
            {meals.map((meal) => {
            return <MealItem key={meal.id} meal={meal} />
            })}
        </div>
    )
}