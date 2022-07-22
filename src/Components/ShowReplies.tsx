import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import Loader from "./Loader";
import { GET_REPLIES } from "../Graphql/Queries/Blogs/blogQueries";
import { Reply, ShowReplyProps } from "../Types/types";

const ShowReplies = (props: ShowReplyProps) => {
  const [isReply, setIsReply] = useState(false);
  const [getReplies, { loading, error, data }] = useLazyQuery(GET_REPLIES, {
    variables: {
      id: props.commentid,
    },
  });

  if (loading) return <Loader />;
  if (error) return <p>Error!!</p>;

  return (
    <div>
      {props.replyCount !== "0" && (
        <div
          style={{
            borderLeft: isReply ? "2px solid black" : "",
            marginLeft: "18px",
            cursor: "pointer",
            color: "#0053ffb8",
          }}
        >
          <p
            className=""
            onClick={() => {
              setIsReply(!isReply);
              getReplies();
            }}
          >
            <p style={{ marginLeft: "8px", marginTop: "-12px" }}>
              {isReply ? `hide replies` : `show replies`}{" "}
              {`(${props.replyCount})`}
            </p>
            {isReply &&
              data?.getReplies?.map((reply: Reply) => (
                <p className="blogReply" key={reply.id}>
                  <b>{reply?.user?.name?.toUpperCase()}: </b>
                  {reply.content}
                </p>
              ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShowReplies;
