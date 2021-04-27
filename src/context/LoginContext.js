import React, { createContext, useState } from 'react';

export const LoginContext = createContext({});

function LoginContextProvider({ children }) {
  //   const [Login, toggleLogin] = useState('nl');

  function changeLogin() {
    // if (Login === 'nl') {
    //   toggleLogin('es');
    // } else {
    //   toggleLogin('nl');
    // }
  }

  const data = {
    // activeLogin: Login,
    // changeLogin: changeLogin,
  };

  return <LoginContext.Provider value={data}>{children}</LoginContext.Provider>;
}

export default LoginContextProvider;
