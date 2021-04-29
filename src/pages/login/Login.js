// import './App.css';
import { useContext, useEffect } from 'react';
import { LoginContext } from '../../context/LoginContext';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// firebase config
import app from '../../modules/firebase';

// const db = app.firestore();

function Login() {
  const { appUser, userChecked } = useContext(LoginContext);

  const history = useHistory();

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
    }
  };

  // Redirect if  logged in
  useEffect(() => {
    if (appUser && userChecked) {
      history.push('/profile');
    }
  }, [appUser]);

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

      {!appUser && userChecked && (
        <>
          <form onSubmit={userRegister} id="registerform">
            <h1>Register</h1>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input type="submit" value="Register" />
          </form>

          <form onSubmit={userLogin} id="loginform">
            <h1>Login</h1>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input type="submit" value="Login" />
          </form>
        </>
      )}
    </section>
  );
}

export default Login;
