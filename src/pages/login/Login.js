import './Login.css';
import { useContext, useState } from 'react';
import { LoginContext } from '../../context/LoginContext';
import Loading from '../../components/loading/Loading';

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
      // console.error(e);
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
      // console.error(e);
      setError(e);
    }
  };

  return (
    <>
      {!userChecked && <Loading />}
      <section className="login">
        <div className="login__box">
          {!appUser && userChecked && loginDisplay === 'login' && (
            <>
              <form onSubmit={userLogin} id="loginform">
                <h1>Login</h1>
                <input
                  type="email"
                  className="login__input"
                  placeholder="email"
                />
                <input
                  type="password"
                  className="login__input"
                  placeholder="password"
                />
                <input type="submit" value="Login" className="login__submit" />
              </form>
              {error && loginDisplay === 'login' && (
                <p className="login__error">{error.message}</p>
              )}
              <p
                className="login__link"
                onClick={() => {
                  toggleLogin('register');
                }}
              >
                No account? Click here to register
              </p>
            </>
          )}

          {!appUser && userChecked && loginDisplay === 'register' && (
            <>
              <form onSubmit={userRegister} id="registerform">
                <h1>Register</h1>
                <input
                  type="email"
                  className="login__input"
                  placeholder="email"
                />
                <input
                  type="password"
                  className="login__input"
                  placeholder="password"
                />
                <input
                  type="submit"
                  value="Register"
                  className="login__submit"
                />
              </form>
              {error && loginDisplay === 'register' && (
                <p className="login__error">{error.message}</p>
              )}
              <p
                className="login__link"
                onClick={() => {
                  toggleLogin('login');
                }}
              >
                Already have an account? Log in here
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Login;
