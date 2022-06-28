import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LOGIN } from "../Graphql/Mutations";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const notify = () => toast("User Logged-in!");

  const [onLogin, { loading, error, data }] = useMutation(LOGIN, {
    variables: {
      loginDTO: {
        email,
        password,
      },
    },
  });

  const onClickLogin = async () => {
    try {
      const user = localStorage.getItem("user");
      if (email && password && !user) {
        const { errors, data } = await onLogin();
        if (data?.login?.id) {
          document.cookie = `token=${data?.login?.jwt}`;
          localStorage.setItem("user", data?.login?.id);
          notify();
          setEmail("");
          setPassword("");
          setLoginError("");
        } else {
          setLoginError("incorrect credentials!");
        }
      } else if (user) {
        alert("Already Logged-in!");
      } else {
        alert("All Fields are required!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <div>
      <ToastContainer />
      <h2>Login:</h2>
      Email:{" "}
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      Password:{" "}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <button onClick={() => onClickLogin()}>Login</button>
      <h4>{loginError}</h4>
    </div>
  );
};

export default Login;
