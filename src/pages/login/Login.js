// import './App.css';
import { useContext, useState } from 'react';
import { LoginContext } from '../../context/LoginContext';

// firebase config
import app from '../../modules/firebase';

function Login() {
  const [loginDisplay, setLoginDisplay] = useState('login');
  const [error, setError] = useState();

  const toggleLogin = function (type) {
    setLoginDisplay(type);
    setError('');
  };

  const { appUser, userChecked } = useContext(LoginContext);

  // register user
  const userRegister = async event => {
    event.preventDefault();
    const [email, password] = event.target;

    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };

  // login user
  const userLogin = async event => {
    event.preventDefault();
    const [email, password] = event.target;

    try {
      await app.auth().signInWithEmailAndPassword(email.value, password.value);
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      {!userChecked && <p>Loading...</p>}

      {!appUser && userChecked && loginDisplay === 'login' && (
        <>
          <form onSubmit={userLogin} id="loginform">
            <h1>Login</h1>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input type="submit" value="Login" />
          </form>
          <button
            type="button"
            onClick={() => {
              toggleLogin('register');
            }}
          >
            Register
          </button>
        </>
      )}

      {!appUser && userChecked && loginDisplay === 'register' && (
        <>
          <form onSubmit={userRegister} id="registerform">
            <h1>Register</h1>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input type="submit" value="Register" />
          </form>
          <button
            type="button"
            onClick={() => {
              toggleLogin('login');
            }}
          >
            Login
          </button>
        </>
      )}

      {error && <p>{error.message}</p>}
    </section>
  );
}

export default Login;
