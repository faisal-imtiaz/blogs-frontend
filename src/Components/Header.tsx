import { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { AppContext } from "../Context/AppContext";
import { AuthState } from "../Types/types";

const Header = () => {
  const appContext: AuthState = useContext(AppContext);
  const userStatus = appContext?.userStatus;
  const setUserStatus = appContext?.setUserStatus;

  const onLogout = () => {
    localStorage.clear();
    setUserStatus("");
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
            {userStatus && (
              <Link to="/my-blogs">
                <NavLink>My Blogs</NavLink>
              </Link>
            )}
            <Link to="/about-us">
              <NavLink>About us</NavLink>
            </Link>
            {!userStatus && (
              <Link to="/login">
                <NavLink>Login</NavLink>
              </Link>
            )}
            {userStatus && (
              <Link to="/login" onClick={() => onLogout()}>
                <NavLink>Logout</NavLink>
              </Link>
            )}
          </span>
          {userStatus && (
            <Link to="/new-blog">
              <StyledButton>Create Blog</StyledButton>
            </Link>
          )}
          {!userStatus && (
            <Link to="/signup">
              <NavLink>Signup</NavLink>
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
