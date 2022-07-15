import { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_COMMENT } from "../Graphql/Mutations/Blogs/blogMutations";
import { GET_REPLIES } from "../Graphql/Queries/Blogs/blogQueries";

const AddReply = (props: any) => {
  const [reply, setReply] = useState<string>("");

  const [addNewComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    refetchQueries: [
      { query: GET_REPLIES, variables: { id: props.commentId } },
      "getReplies",
    ],
    variables: {
      createCommentInputDTO: {
        content: reply,
        user: localStorage.getItem("user"),
        commentid: props.commentId,
      },
    },
  });

  const onReply = () => {
    if (reply && localStorage.getItem("user")) {
      addNewComment();
      setReply("");
    } else if (reply) {
      alert("Login to add Reply!");
    } else {
      alert("Reply cannot be Empty!");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <div>
      <input
        placeholder="Type Reply..."
        style={{ padding: "4px" }}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <button style={{ marginLeft: "4px" }} onClick={() => onReply()}>
        Add Reply
      </button>
    </div>
  );
};

export default AddReply;
