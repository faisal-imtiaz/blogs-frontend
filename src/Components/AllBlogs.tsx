import { useState } from "react";
import { useQuery } from "@apollo/client";

import Comments from "./Comments";
import AddReply from "./AddReply";
import { GET_BLOGS } from "../Graphql/Queries";
import { blog } from "../Types/types";

const AllBlogs = () => {
  const [reply, setReply] = useState<Number>(-1);
  const [blogReply, setBlogReply] = useState<Number>(-1);

  const { loading, error, data } = useQuery(GET_BLOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;
  const blogs = data?.blogs;

  const onReplyToggle = (index: Number, blog: blog) => {
    if (reply === index && blogReply === blog.id) {
      setReply(-1);
    } else {
      setReply(index);
      setBlogReply(blog.id);
    }
  };

  return (
    <div className="container">
      <div className="mainHeading">
        <h2>All Blogs:</h2>
      </div>

      {blogs?.map((blog: blog) => {
        return (
          <div className="blogsDiv" key={blog.id}>
            <p>
              <b>Blog Title:</b> {blog.title}
            </p>
            <p>{blog.content}</p>
            <h3>Comments:</h3>
            {blog?.comments.map((comment: any, index: Number) => (
              <>
                <p style={{ fontSize: "18px" }}>
                  <b>{comment?.userName?.toUpperCase()}</b>{" "}
                  {blog.userid === comment.userid && <span>(author)</span>}:{" "}
                  {comment.content} .{" "}
                  <span
                    className="blogsReplyText"
                    onClick={() => onReplyToggle(index, blog)}
                  >
                    reply
                  </span>
                </p>
                {comment.replies.map((reply: any) => (
                  <p style={{ marginLeft: "24px", fontSize: "14px" }}>
                    <b>{reply?.userName?.toUpperCase()}: </b>
                    <i>{reply.content}</i>
                  </p>
                ))}
                {reply === index && blogReply === blog.id && (
                  <AddReply commentId={comment.id} />
                )}
              </>
            ))}
            <Comments blogId={blog.id} />
          </div>
        );
      })}
    </div>
  );
};

export default AllBlogs;
