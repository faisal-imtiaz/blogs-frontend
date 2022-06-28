import { useState } from "react";
import { useMutation } from "@apollo/client";

import { NEW_COMMENT } from "../Graphql/Mutations";
import { GET_BLOGS } from "../Graphql/Queries";
import { CommentProps } from "../Types/types";

const AddComment = (props: CommentProps) => {
  const [comment, setComment] = useState<string>("");

  const [addNewComment, { loading, error }] = useMutation(NEW_COMMENT, {
    refetchQueries: [{ query: GET_BLOGS }, "blogs"],
    variables: {
      newCommentDTO: {
        content: comment,
        userid: localStorage.getItem("user"),
        blogid: props.blogId,
      },
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
        placeholder="Type Comment..."
        style={{ padding: "6px", borderRadius: "3px", border: "none" }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button style={{ marginLeft: "4px" }} onClick={() => onComment()}>
        Add Comment
      </button>
    </div>
  );
};

export default AddComment;
