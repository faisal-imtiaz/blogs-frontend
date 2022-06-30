import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SIGNUP } from "../Graphql/Mutations/Users/userMutation";

const Signup = () => {
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string | number>("");
  const [signupError, setSignupError] = useState<string>("");
  const notify = () => toast("New User Added!");

  const [addNewUser, { loading, error, data }] = useMutation(SIGNUP, {
    variables: {
      createUserInputDTO: {
        name: newName,
        email: newEmail,
        password: newPassword,
      },
    },
  });

  const onClickSignup = async () => {
    try {
      if (newName && newEmail && newPassword) {
        const { data } = await addNewUser();
        if (data?.signup) {
          notify();
          setNewName("");
          setNewEmail("");
          setNewPassword("");
        } else {
          setSignupError("User Already Exist!");
        }
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
      <h2>Signup:</h2>
      Enter Name:{" "}
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />{" "}
      Enter Email:{" "}
      <input
        type="text"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />{" "}
      Enter Password:{" "}
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />{" "}
      <button onClick={() => onClickSignup()}>SignUp</button>
      <h4>{signupError}</h4>
    </div>
  );
};

export default Signup;
