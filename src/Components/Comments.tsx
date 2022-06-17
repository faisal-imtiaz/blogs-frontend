import { useState } from "react";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { NEW_COMMENT } from "../Graphql/Mutations";
import { GET_BLOGS } from "../Graphql/Queries";
import { commentProps } from "../Types/types";

const Comments = (props: commentProps) => {
  const [comment, setComment] = useState("");

  const [addNewComment, { loading, error, data }] = useMutation(NEW_COMMENT, {
    refetchQueries: [{ query: GET_BLOGS }, "blogs"],
    variables: {
      id: uuidv4(),
      content: comment,
      userid: localStorage.getItem("user"),
      blogid: props.blogId,
    },
  });

  const onComment = () => {
    if (comment && localStorage.getItem("user")) {
      addNewComment();
      setComment("");
    } else if (localStorage.getItem("user")) {
      alert("Comment cannot be Empty!");
    } else {
      alert("Login for comment!");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <div style={{ paddingTop: "16px" }}>
      <input
        placeholder="add Comment"
        style={{ padding: "4px" }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button style={{ marginLeft: "4px" }} onClick={() => onComment()}>
        Add Comment
      </button>
    </div>
  );
};

export default Comments;
