import React, { createContext, useState, useEffect } from 'react';

// firebase config
import app from '../modules/firebase';

export const LoginContext = createContext({});

function LoginContextProvider({ children }) {
  // state management
  const [appUser, setAppUser] = useState(undefined);
  const [userChecked, toggleUserChecked] = useState(false);

  // on mount of the component, ask firebase if we are logged in
  useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        setAppUser(user);
        toggleUserChecked(true);
      }
      if (!user) {
        setAppUser(null);
        toggleUserChecked(true);
      }
    });
  }, []);

  // signout
  const userLogout = async event => {
    try {
      await app.auth().signOut();
    } catch (e) {
      console.error(e);
    }
  };

  const data = {
    userLogout: userLogout,
    appUser: appUser,
    setAppUser: setAppUser,
    userChecked: userChecked,
    totalLessons: [1, 2, 3],
  };

  return <LoginContext.Provider value={data}>{children}</LoginContext.Provider>;
}

export default LoginContextProvider;
