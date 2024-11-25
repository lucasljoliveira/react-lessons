import { Link } from "react-router-dom";

const PRODUCTS = [
    {id: "1", title: "Product 1"},
    {id: "2", title: "Product 2"},
    {id: "3", title: "Product 3"},
    {id: "4", title: "Product 4"}
]

export default function Products() {
    return <>
        <h1>Products page</h1>
        {PRODUCTS.map((product) => {
            return <li><Link to={product.id}>{product.title}</Link></li>
        })}
    </>
}