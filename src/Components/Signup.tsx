import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

import { SIGNUP } from "../Graphql/Mutations";

const Signup = () => {
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string | number>("");
  const notify = () => toast("New User Added!");

  const [addNewUser, { loading, error, data }] = useMutation(SIGNUP, {
    variables: {
      id: uuidv4(),
      name: newName,
      email: newEmail,
      password: newPassword,
    },
  });

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
      <button
        onClick={() => {
          if (newName && newEmail && newPassword) {
            if (newEmail.includes("@")) {
              addNewUser();
              notify();
              setNewEmail("");
              setNewPassword("");
              setNewName("");
            } else {
              alert("Email is invalid!");
            }
          } else {
            alert("All fields are required!");
          }
        }}
      >
        SignUp
      </button>
    </div>
  );
};

export default Signup;
