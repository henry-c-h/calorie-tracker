import { Link, Outlet, useNavigate } from 'react-router-dom';
import { fetchUserAsync } from '../features/userSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogoutClick() {
    await fetch('/api/auth/logout');
    dispatch(fetchUserAsync()).then(() => navigate('/login'));
  }

  return (
    <>
      <div className="navbar">
        <div className="nav-content">
          <p>
            <img
              className="logo-image"
              src="./assets/food-icon.svg"
              alt="food icon"
            />
            Calorie Tracker
          </p>
          <ul className="nav-menu">
            <li>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/my-goals">
                My Goals
              </Link>
            </li>
            <li onClick={handleLogoutClick}>
              <Link className="nav-link" to="/login">
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="app">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
