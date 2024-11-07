import { useSelector } from 'react-redux';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const user = useSelector(state => state.auth.user)

  return (
    <main className={classes.profile}>
      <h2>My User Profile</h2>
      <p>{user.email}</p>
      -
      <p>{user.password}</p>
    </main>
  );
};

export default UserProfile;
