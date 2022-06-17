import { useState } from "react";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { NEW_REPLY } from "../Graphql/Mutations";
import { GET_BLOGS } from "../Graphql/Queries";

const AddReply = (props: any) => {
  const [reply, setReply] = useState<string>("");

  const [addNewReply, { loading, error, data }] = useMutation(NEW_REPLY, {
    refetchQueries: [{ query: GET_BLOGS }, "blogs"],
    variables: {
      id: uuidv4(),
      content: reply,
      commentId: props.commentId,
      userId: localStorage.getItem("user"),
    },
  });

  const onReply = () => {
    if (reply) {
      addNewReply();
      setReply("");
    } else {
      alert("Reply cannot be Empty!");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <div>
      <input
        placeholder="add Reply"
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
