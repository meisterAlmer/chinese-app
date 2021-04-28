import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
// import Sidebar from './components/Sidebar';
import Home from './pages/home/Home';
import AboutMe from './pages/aboutMe/AboutMe';
import Lessons from './pages/lessons/Lessons';
import Practice from './pages/practice/Practice';
import Login from './pages/login/Login';
// import { LoginContext } from '../../context/LoginContext';

function App() {
  // const { activeLogin } = useContext(LoginContext); <-- Data from context file

  return (
    <Router>
      <div className="app">
        <Header />
        {/* <Sidebar /> */}
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/aboutme">
              <AboutMe />
            </Route>
            <Route path="/lessons">
              <Lessons />
            </Route>
            <Route path="/practice">
              <Practice />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
