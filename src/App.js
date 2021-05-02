import './App.css';
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import AboutMe from './pages/aboutMe/AboutMe';
import Lessons from './pages/lessons/Lessons';
import Lesson from './pages/lesson/Lesson';
import Practice from './pages/practice/Practice';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import { LoginContext } from './context/LoginContext';

function App() {
  const { appUser } = useContext(LoginContext);
  function PrivateRoute({ children, isAuth, ...rest }) {
    return (
      <Route {...rest}>{isAuth ? children : <Redirect to="/login" />}</Route>
    );
  }

  function LoginRoute({ children, isAuth, ...rest }) {
    return (
      <Route {...rest}>{!isAuth ? children : <Redirect to="/profile" />}</Route>
    );
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/aboutme">
              <AboutMe />
            </Route>
            <Route exact path="/lessons">
              <Lessons />
            </Route>

            <Route exact path="/lessons/lesson/:lesson">
              <Lesson />
            </Route>

            <Route exact path="/practice">
              <Practice />
            </Route>

            <PrivateRoute exact path="/profile" isAuth={appUser}>
              <Profile />
            </PrivateRoute>

            <LoginRoute exact path="/login" isAuth={appUser}>
              <Login />
            </LoginRoute>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
