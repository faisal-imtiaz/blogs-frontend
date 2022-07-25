import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import Loader from "./Loader";
import { CREATE_COMMENT } from "../Graphql/Mutations/Blogs/blogMutations";
import { GET_REPLIES } from "../Graphql/Queries/Blogs/blogQueries";
import { ReplyProps } from "../Types/types";
import { AppContext } from "../Context/AppContext";
import { AuthState } from "../Types/types";

const AddReply = (props: ReplyProps) => {
  const [reply, setReply] = useState<string>("");

  const appContext: AuthState = useContext(AppContext);
  const userStatus = appContext?.userStatus;

  const [addNewComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    refetchQueries: [
      { query: GET_REPLIES, variables: { id: props.commentId } },
      "getReplies",
    ],
    variables: {
      createCommentInputDTO: {
        content: reply,
        user: userStatus,
        commentid: props.commentId,
      },
    },
  });

  const onReply = () => {
    if (reply && userStatus) {
      addNewComment();
      setReply("");
    } else if (reply) {
      alert("Login to add Reply!");
    } else {
      alert("Reply cannot be Empty!");
    }
  };

  if (loading) return <Loader />;
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
