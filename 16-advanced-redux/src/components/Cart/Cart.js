import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const items = useSelector(state => state.cart.items)
  console.log(items)

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>

      <ul>
        {items.map(item => {
          return <CartItem key={item.name}
            item={item}
          />
        })}
      </ul>
    </Card>
  );
};

export default Cart;
