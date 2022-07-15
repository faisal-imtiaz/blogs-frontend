import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem("user") ? true : false
  );
  const onLogout = () => {
    const user = localStorage.getItem("user");
    if (user) {
      localStorage.clear();
      document.cookie = "token=";
      document.cookie = "token=; expires=Thu, 18 Dec 2013 12:00:00 UTC ";
      setLoggedIn(false);
      window.location.replace("/login");
    }
  };

  return (
    <>
      <header className="header-container">
        <h1 className="header-blogHeading">Blogs Project</h1>
      </header>
      <div className="header-navbar">
        <Link to="/">
          <div className="header-nav">Home</div>
        </Link>
        {loggedIn && (
          <Link to="my-blogs">
            <div className="header-nav">My Blogs</div>
          </Link>
        )}
        <Link to="new-blog">
          <div className="header-nav">Add Blog</div>
        </Link>
        <Link to="/about">
          <div className="header-nav">About</div>
        </Link>
        <div className="dropdown">
          <button className="dropbtn">More</button>
          <div className="dropdown-content">
            <Link to="/signup">Signup</Link>
            {!loggedIn && <Link to="/login">Login</Link>}
            {loggedIn && (
              <Link to="/login" onClick={() => onLogout()}>
                Logout
              </Link>
            )}
          </div>
        </div>
        <div className="header-userStatus">
          <p style={{}}>
            Currently:{" "}
            {loggedIn ? (
              <span style={{ color: "green", fontWeight: "bold" }}>
                Logged-in
              </span>
            ) : (
              <span style={{ color: "red", fontWeight: "bold" }}>
                Logged-out
              </span>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
