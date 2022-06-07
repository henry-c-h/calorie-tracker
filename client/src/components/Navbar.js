import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
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
            Know thy calorie
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
            <li>
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
