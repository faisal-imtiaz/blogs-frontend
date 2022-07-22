import { useState } from "react";
import { useMutation } from "@apollo/client";
import Loader from "./Loader";
import { CREATE_COMMENT } from "../Graphql/Mutations/Blogs/blogMutations";
import { GET_BLOGS } from "../Graphql/Queries/Blogs/blogQueries";
import { CommentProps } from "../Types/types";

const AddComment = (props: CommentProps) => {
  const [comment, setComment] = useState<string>("");

  const [addNewComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: GET_BLOGS }, "getBlogs"],
    variables: {
      createCommentInputDTO: {
        content: comment,
        user: localStorage.getItem("user"),
        blog: props.blogId,
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

  if (loading) return <Loader />;
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
