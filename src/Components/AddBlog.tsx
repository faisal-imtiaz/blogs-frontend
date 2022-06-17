import { useState } from "react";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { NEW_BLOG } from "../Graphql/Mutations";
import { GET_BLOGS } from "../Graphql/Queries";

const AddBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [addNewBlog, { loading, error, data }] = useMutation(NEW_BLOG, {
    refetchQueries: [{ query: GET_BLOGS }, "blogs"],
    variables: {
      id: uuidv4(),
      title,
      content,
      userId: localStorage.getItem("user"),
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <div className="container">
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
        <button onClick={() => addNewBlog()}>Add Blog</button>
      </div>
    </div>
  );
};

export default AddBlog;
