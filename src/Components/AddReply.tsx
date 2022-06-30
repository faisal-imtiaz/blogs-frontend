import { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_REPLY } from "../Graphql/Mutations/Blogs/blogMutations";
import { GET_BLOGS } from "../Graphql/Queries/Blogs/blogQueries";

const AddReply = (props: any) => {
  const [reply, setReply] = useState<string>("");

  const [addNewReply, { loading, error, data }] = useMutation(CREATE_REPLY, {
    refetchQueries: [{ query: GET_BLOGS }, "blogs"],
    variables: {
      createReplyInputDTO: {
        content: reply,
        comment: props.commentId,
        user: localStorage.getItem("user"),
      },
    },
  });

  const onReply = () => {
    if (reply && localStorage.getItem("user")) {
      addNewReply();
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
