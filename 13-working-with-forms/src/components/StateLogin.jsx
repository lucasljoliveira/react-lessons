import Input from "./Input";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";
import useInput from "../hooks/useInput";

export default function Login() {
  const {
    value: emailValue,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
    hasError: emailHasError
  } = useInput("", (value) => {
    return isNotEmpty(value) && isEmail(value)
  });

  const {
    value: passwordValue,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
    hasError: passwordHasError
  } = useInput("", (value) => {
    return hasMinLength(value, 6)
  });

  function handleSubmit(event){
    event.preventDefault();

    if (emailHasError || passwordHasError) {
      return
    }

    console.log(emailValue);
    console.log(passwordValue);

    // also validate inputs here, same as on change value
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input 
          label="Email"
          id="email"
          type="email" 
          name="email"
          value={emailValue} 
          onBlur={handleEmailBlur} 
          onChange={handleEmailChange}
          error={emailHasError && "Please enter a valid email."}
          />
        <Input 
          label="Password"
          id="password" 
          type="password" 
          name="password" 
          value={passwordValue} 
          onBlur={handlePasswordBlur} 
          onChange={handlePasswordChange}
          error={passwordHasError && "Please enter a valid password."}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
