import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartActions } from '../../store/cart-slice';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, price } = props.item;

  const total = quantity * price;
  
  function addItemhandle(item){
    dispatch(cartActions.addItem(item))
  }
  function removeItemhandle(item){
    dispatch(cartActions.removeItem(item))
  }

  return (
    <li className={classes.item} key={title}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => removeItemhandle(props.item)}>-</button>
          <button onClick={() => addItemhandle(props.item)}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
