const Navbar = () => {
  return (
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
          <li>Overview</li>
          <li>History</li>
          <li>Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
