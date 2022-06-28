import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const notify = () => toast("User Logged-out!");

  const onLogout = () => {
    const user = localStorage.getItem("user");
    if (user) {
      localStorage.clear();
      document.cookie = "token=";
      document.cookie = "token=; expires=Thu, 18 Dec 2013 12:00:00 UTC ";
      notify();
    }
  };

  return (
    <>
      <ToastContainer />
      <header className="header-container">
        <h1 className="header-blogHeading">Blogs Project</h1>
      </header>
      <div className="header-navbar">
        <Link to="/">
          <div className="header-nav">Home</div>
        </Link>
        <Link to="all-blogs">
          <div className="header-nav">Blogs</div>
        </Link>
        <Link to="new-blog">
          <div className="header-nav">Add Blog</div>
        </Link>
        <Link to="/about">
          <div className="header-nav">About</div>
        </Link>
        <div className="dropdown">
          <button className="dropbtn">More</button>
          <div className="dropdown-content">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login" onClick={() => onLogout()}>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
