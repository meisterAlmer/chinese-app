import "./Header.css";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import Button from "../../components/button/Button";
import logo from "../../assets/logo_lei.svg";

function Header() {
  const { appUser, userLogout } = useContext(LoginContext);

  // let history = useHistory();

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" className="logo__image" />
      </div>
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
              <NavLink
                exact
                to="/login"
                activeClassName="active"
                className="login"
              >
                Login
              </NavLink>
            </li>
          )}

          {appUser && (
            <li>
              <Button
                label={"Logout"}
                clickEvent={userLogout}
                disabled={false}
                small={true}
              />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
