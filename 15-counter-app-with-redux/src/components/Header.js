import { useDispatch, useSelector } from 'react-redux';
import classes from './Header.module.css';
import { authActions } from '../store/auth';

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  function logoutHandle(){
    dispatch(authActions.logout())
  }

  const authenticatedMenu = (
    <nav>
      <ul>
        <li>
          <a href='/'>My Products</a>
        </li>
        <li>
          <a href='/'>My Sales</a>
        </li>
        <li>
          <button onClick={logoutHandle}>Logout</button>
        </li>
      </ul>
    </nav>
  )

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
          { isAuthenticated && authenticatedMenu }
    </header>
  );
};

export default Header;
