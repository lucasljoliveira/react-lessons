import { useDispatch } from 'react-redux';
import classes from './Auth.module.css';
import { authActions } from '../store/auth';

const Auth = () => {
  const dispatch = useDispatch();

  function loginHandle(event){
    event.preventDefault();

    const fd = new FormData(event.target);

    const loginInfo = Object.fromEntries(fd.entries());

    const email = loginInfo.email;
    const password = loginInfo.password;
    dispatch(authActions.login({email: email, password: password}));
  }

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandle}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name="password"/>
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
