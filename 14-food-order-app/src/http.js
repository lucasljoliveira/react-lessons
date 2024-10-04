export async function fetchMeals(){
    const response = await fetch("http://localhost:3000/meals")
    
    if (!response.ok) {
        throw new Error("Failed to fetch Meals.");
    };
    const data = await response.json()

    return data;
}

export async function postOrder(body){
    const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
    })
    
    if (!response.ok) {
        throw new Error("Failed to post the Order.");
    };
    const data = await response.json()
    
    return data;
}
