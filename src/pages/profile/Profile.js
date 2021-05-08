import './Profile.css';
import { useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';
import Button from '../../components/button/Button';

function Profile() {
  const { userLogout, appUser, userChecked } = useContext(LoginContext);

  return (
    <section className="profile">
      <div className="profile-box">
        <h1>Profile</h1>
        {!appUser && userChecked && (
          <>
            <h2>You are not logged in</h2>
            <p className="profile--icon">🌚</p>
          </>
        )}
        {appUser && userChecked && (
          <>
            <h2>Hello {appUser.email}</h2>
            <p className="profile--icon">🌞</p>
            <p>You are currently logged in!</p>
            <Button label={'Logout'} clickEvent={userLogout} disabled={false} />
          </>
        )}
      </div>
    </section>
  );
}

export default Profile;
