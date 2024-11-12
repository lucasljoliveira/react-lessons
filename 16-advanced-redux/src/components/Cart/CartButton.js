import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';


const CartButton = (props) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items)

  function toggleCartHandle(){
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={toggleCartHandle}>
      <span>My Cart</span>
      <span className={classes.badge}>{items.length}</span>
    </button>
  );
};

export default CartButton;
