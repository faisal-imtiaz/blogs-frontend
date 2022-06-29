import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NEW_BLOG } from "../Graphql/Mutations";
import { GET_BLOGS } from "../Graphql/Queries";

const AddBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const notify = () => toast("Blog Added!");

  const [addNewBlog, { loading, error, data }] = useMutation(NEW_BLOG, {
    refetchQueries: [{ query: GET_BLOGS }, "blogs"],
    variables: {
      createBlogDTO: {
        title,
        content,
        userid: localStorage.getItem("user"),
      },
    },
  });

  const addBlogDB = () => {
    if (title && content && localStorage.getItem("user")) {
      addNewBlog();
      notify();
    } else if (localStorage.getItem("user")) {
      alert("All Fields required!");
    } else {
      alert("Login to add blog!");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <div className="container">
      <ToastContainer />
      <div className="mainHeading">
        <h2>Add New Blog:</h2>
      </div>
      <div className="blogsDiv">
        <div style={{ padding: "10px 0" }}>
          Title:{" "}
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <hr />
        <div style={{ marginTop: "24px" }}>
          <p>Content:</p>
          <textarea
            style={{ width: "345px", height: "200px" }}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button onClick={() => addBlogDB()}>Add Blog</button>
      </div>
    </div>
  );
};

export default AddBlog;
