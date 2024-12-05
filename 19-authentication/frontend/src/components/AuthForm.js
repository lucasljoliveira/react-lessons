import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const [ searchParams ] = useSearchParams();
  const navigation = useNavigation();

  const mode = searchParams.get('mode') || "login";
  const isLogin = mode === "login";
  const isSubmitting = navigation.state === "submitting";

  const actionData = useActionData();

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>

        {actionData && actionData.message && <p>{actionData.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
          {
            actionData && actionData.errors && actionData.errors.email && (
              <p key={actionData.errors.email}>{actionData.errors.email}</p>
          )}
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
          {
            actionData && actionData.errors && actionData.errors.password && (
              <p key={actionData.errors.password}>{actionData.errors.password}</p>
          )}
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? "Submitting" : "Save"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
