import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_REPLIES } from "../Graphql/Queries/Blogs/blogQueries";

const ShowReplies = (props: any) => {
  const [isReply, setIsReply] = useState(false);
  const [getReplies, { loading, error, data }] = useLazyQuery(GET_REPLIES, {
    variables: {
      id: props.commentid,
    },
  });

  return props.replyCount !== "0" ? (
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
          {isReply ? `hide replies` : `show replies`} {`(${props.replyCount})`}
        </p>
        {isReply &&
          data?.getReplies?.map((reply: any) => (
            <p className="blogReply" key={reply.id}>
              <b>{reply?.user?.name?.toUpperCase()}: </b>
              {reply.content}
            </p>
          ))}
      </p>
    </div>
  ) : (
    <></>
  );
};

export default ShowReplies;
