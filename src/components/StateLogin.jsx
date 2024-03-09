import { useState } from 'react';

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

  const emailIsInvalid = didEdited.email && !enteredValue.email.includes('@');

  function handleSubmit(event) {
    event.preventDefault();

    console.log(enteredValue);
    // Reseting input fields via state
    // Alternative use reset button type (not programatically)
    setEnteredValue({
      email: '',
      password: '',
    });
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
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => handleInputBlur('email')}
            onChange={(event) => handleInputChange('email', event)}
            value={enteredValue.email}
          />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid e-mail address</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onBlur={() => handleInputBlur('password')}
            onChange={(event) => handleInputChange('password', event)}
            value={enteredValue.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
