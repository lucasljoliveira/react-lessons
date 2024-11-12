import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import { fetchCartData } from './store/cart-actions'
// import { sendCartData } from './store/cart-actions'
import Notification from './components/UI/Notification'

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.show)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])

  // We can't use async function or http requests inside dispatch, so there are two ways of doing it out of the dispatch, using useEffect and using Thunk action creator, bellow we have both implementations.
  
  // useEffect implementation:
  useEffect(() => {
    async function sendCartData() {
      dispatch(uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!"
      }))
      const response = await fetch("https://lucastest-5de25-default-rtdb.firebaseio.com/cart.json", {method: "PUT", body: JSON.stringify({items: cart.items})})
      if (!response.ok) {
        throw new Error("Sending cart data failied.")
      }
      
      // const responseData = await response.json();
      dispatch(uiActions.showNotification({
        status: "success",
        title: "Success...",
        message: "Sent cart data successfully!"
      }))

    }

    if (isInitial){
      isInitial = false;
      return
    }

    if (cart.changed) {
      sendCartData().catch(error => {
        dispatch(uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: error.message || "Sent cart data failed!"
        }))
      })
    }
  }, [cart, dispatch]); // dispatch function never changes, that is guaranteed by react

  // Using a action creator Thunk, where the code is on the sendCartData function
  // useEffect(() => {
  //   if (isInitial){
  //     isInitial = false;
      
  //     return
  //   }

  //   if (cart.changed) {
  //     dispatch(sendCartData(cart)) // Dispatch function can receive either an action or a thunk, that is a function.
  //   }
  // }, [cart, dispatch]); // dispatch function never changes, that is guaranteed by react

  return (
    <Fragment>
      {notification && (
        <Notification 
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
