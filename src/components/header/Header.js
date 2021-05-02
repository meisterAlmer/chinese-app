import './Header.css';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';

function Header() {
  const { appUser, userLogout } = useContext(LoginContext);

  // let history = useHistory();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/aboutme" activeClassName="active">
              About Me
            </NavLink>
          </li>
          <li>
            <NavLink to="/lessons" activeClassName="active">
              Lessons
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/practice" activeClassName="active">
              Practice
            </NavLink>
          </li>
          {appUser && (
            <li>
              <NavLink exact to="/profile" activeClassName="active">
                Profile
              </NavLink>
            </li>
          )}
          {!appUser && (
            <li>
              <NavLink exact to="/login" activeClassName="active">
                Login
              </NavLink>
            </li>
          )}

          {appUser && (
            <li>
              <button onClick={userLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
