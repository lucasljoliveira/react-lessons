import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import RootLayout from './pages/Root';
import Error from './pages/Error';
import ProductDetail from './pages/ProductDetail';

// Relative path = Don't start with / and put the additional path into the actual path, if you are on http://my-website/products and navigate to the product 1 the url will become http://my-website/products/1
// Absolut path = Starts with / and put the additional path into main path, if you are on http://my-website/products and navigate to /account the url will become http://my-website/account

const router = createBrowserRouter([
  { path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home/> },
      { path: 'products', element: <Products/> },
      { path: 'products/:productId', element: <ProductDetail/> },
    ]
  },
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
