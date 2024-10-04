import Store from "./components/Store";
import StoreContextProvider from "./store/StoreContext";


function App() {
  return (
    <StoreContextProvider>
      <Store />
    </StoreContextProvider>
  );
}

export default App;
