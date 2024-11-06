import Store from "./components/Store";
import StoreContextProvider from "./store/StoreContext";
import { CartProgressContextProvider } from "./store/CartContext";


function App() {
  return (
    <CartProgressContextProvider>
      <StoreContextProvider>
        <Store />
      </StoreContextProvider>
    </CartProgressContextProvider>
  );
}

export default App;
