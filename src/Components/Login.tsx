import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import Loader from "./Loader";
import { AppContext } from "../Context/AppContext";
import { LOGIN } from "../Graphql/Mutations/Users/userMutation";
import { AuthState } from "../Types/types";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const [onLogin, { loading, error, data }] = useMutation(LOGIN, {
    variables: {
      loginPayloadDTO: {
        email,
        password,
      },
    },
  });

  const appContext: AuthState = useContext(AppContext);
  const setUserStatus = appContext?.setUserStatus;

  const onClickLogin = async () => {
    try {
      if (email && password) {
        const { errors, data } = await onLogin();
        if (data?.login?.id) {
          localStorage.setItem("token", data?.login?.jwt);
          setEmail("");
          setPassword("");
          setLoginError("");
          setUserStatus(data?.login?.id);
        } else {
          setLoginError("incorrect credentials!");
        }
      } else {
        alert("All Fields are required!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error!!</p>;

  return (
    <div>
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
