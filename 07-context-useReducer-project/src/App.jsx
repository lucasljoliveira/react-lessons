import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import ShoppingCartContextProvider from './store/ShoppingCartContext.jsx';

function App() {

  return (
    <ShoppingCartContextProvider>
      <Header />
      <Shop />
    </ShoppingCartContextProvider>
  );
}

export default App;
