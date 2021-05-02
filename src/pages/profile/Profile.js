// import './App.css';
import { useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';
// import { useHistory } from 'react-router-dom';

// const db = app.firestore();

function Profile() {
  const { userLogout, appUser, userChecked } = useContext(LoginContext);

  // const history = useHistory();

  // Redirect if not logged in
  // useEffect(() => {
  //   if (!appUser && userChecked) {
  //     history.push('/login');
  //   }
  // }, [appUser, userChecked]);

  return (
    <section>
      <h1>Profile</h1>
      {/* {console.log(appUser, userChecked)} */}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      {!appUser && userChecked && (
        <>
          <p>You are not logged in</p>
        </>
      )}
      {appUser && userChecked && (
        <>
          <p>Hello {appUser.email}</p>
          <button onClick={userLogout}>Logout</button>
        </>
      )}
    </section>
  );
}

export default Profile;
