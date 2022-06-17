import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LOGIN } from "../Graphql/Mutations";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const notify = () => toast("User Logged-in!");

  const [onLogin, { loading, error, data }] = useMutation(LOGIN, {
    variables: {
      email,
      password,
    },
  });

  const onClickLogin = async () => {
    try {
      const { errors, data } = await onLogin();
      document.cookie = `token=${data?.login?.jwt}`;
      localStorage.setItem("user", data?.login?.id);
      notify();
      setEmail("");
      setPassword("");
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
    </div>
  );
};

export default Login;
