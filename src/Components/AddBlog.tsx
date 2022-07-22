import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./Loader";
import { BLOG_ADDED } from "../utills/constants";
import { CREATE_BLOG } from "../Graphql/Mutations/Blogs/blogMutations";
import { GET_BLOGS } from "../Graphql/Queries/Blogs/blogQueries";
import "react-toastify/dist/ReactToastify.css";

const AddBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const notify = () => toast(BLOG_ADDED);

  const [addNewBlog, { loading, error, data }] = useMutation(CREATE_BLOG, {
    refetchQueries: [{ query: GET_BLOGS }, "blogs"],
    variables: {
      createBlogInputDTO: {
        title,
        content,
        user: localStorage.getItem("user"),
      },
    },
  });

  const addBlogDB = async () => {
    try {
      if (title && content && localStorage.getItem("user")) {
        const { data } = await addNewBlog();
        notify();
      } else if (localStorage.getItem("user")) {
        alert("All Fields required!");
      } else {
        alert("Login to add blog!");
      }
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  if (loading) return <Loader />;
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
