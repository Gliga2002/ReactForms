import { useState } from 'react';

import Input from './Input';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredValue, setEnteredValue] = useState({
    email: '',
    password: '',
  });

  const [didEdited, setDidEdited] = useState({
    email: false,
    password: false,
  });

  // derived value, outside of form subbmision
  const emailIsInvalid =
    didEdited.email &&
    !isEmail(enteredValue.email) &&
    !isNotEmpty(enteredValue.email);
  const passwordIsInvalid =
    didEdited.password && !hasMinLength(enteredValue.password, 6);

  function handleSubmit(event) {
    event.preventDefault();

    console.log(enteredValue);
    // Reseting input fields via state
    // Alternative use reset button type (not programatically)
    // setEnteredValue({
    //   email: '',
    //   password: '',
    // });
  }

  function handleInputChange(identifier, event) {
    setEnteredValue((prevEnteredValue) => {
      return {
        ...prevEnteredValue,
        [identifier]: event.target.value,
      };
    });
    setDidEdited((prevEdit) => {
      return {
        ...prevEdit,
        [identifier]: false,
      };
    });
  }

  function handleInputBlur(identifier) {
    setDidEdited((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={() => handleInputBlur('email')}
          onChange={(event) => handleInputChange('email', event)}
          value={enteredValue.email}
          error={emailIsInvalid && 'Please enter a valid email'}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={() => handleInputBlur('password')}
          onChange={(event) => handleInputChange('password', event)}
          value={enteredValue.password}
          error={passwordIsInvalid && 'Please enter a valid password'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
