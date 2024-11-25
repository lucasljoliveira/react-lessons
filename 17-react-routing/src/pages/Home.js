import { Link, useNavigate } from 'react-router-dom';


export default function Home() {
    // we can use navigate to go to a page programaticly
    const navigate = useNavigate();

    function navigateHandler() {
        navigate('/products');
    }

    return (
        <>
            <h1>Home Page</h1>
            <p>Go To <Link to="/products">the list of products</Link></p>
            <p><button onClick={navigateHandler}>Navigate</button></p> 
        </>
    )
}