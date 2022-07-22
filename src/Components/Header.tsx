import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
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
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} className="headerContainer">
        <div>
          <span className="logoKwanso">Kwanso</span>{" "}
          <span className="logoBlogs">Blogs</span>
          <span style={{ marginLeft: "100px" }}>
            <Link to="/">
              <NavLink>Homepage</NavLink>
            </Link>
            {loggedIn && (
              <Link to="/my-blogs">
                <NavLink>My Blogs</NavLink>
              </Link>
            )}
            <Link to="/about-us">
              <NavLink>About us</NavLink>
            </Link>
            {!loggedIn && (
              <Link to="/login">
                <NavLink>Login</NavLink>
              </Link>
            )}
            {loggedIn && (
              <Link to="/login" onClick={() => onLogout()}>
                <NavLink>Logout</NavLink>
              </Link>
            )}
          </span>
          {loggedIn && (
            <Link to="/new-blog">
              <StyledButton>Create Blog</StyledButton>
            </Link>
          )}
        </div>
      </Container>
    </>
  );
};

export default Header;

const NavLink = styled.span`
  text-decoration: none;
  color: black;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  line-height: 15px;
  margin-left: 32px;
`;

const StyledButton = styled(Button)({
  marginLeft: "460px",
  color: "white",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid #00AAA1",
  lineHeight: 1.5,
  backgroundColor: "#00AAA1",
  "&:hover": {
    backgroundColor: "#029e96",
    borderColor: "#029e96",
  },
});
