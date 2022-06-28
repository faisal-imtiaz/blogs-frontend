import { useState } from "react";
import { useQuery } from "@apollo/client";

import AddComment from "./AddComment";
import AddReply from "./AddReply";
import { GET_BLOGS } from "../Graphql/Queries";
import { Blog } from "../Types/types";

const AllBlogs = () => {
  const [reply, setReply] = useState<Number>(-1);
  const [blogReply, setBlogReply] = useState<Number>(-1);

  const onReplyToggle = (index: Number, blog: Blog) => {
    if (reply === index && blogReply === blog.id) {
      setReply(-1);
    } else {
      setReply(index);
      setBlogReply(blog.id);
    }
  };

  const { loading, error, data } = useQuery(GET_BLOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;
  const blogs = data?.blogs;

  return (
    <div className="container">
      <div className="mainHeading">
        <h2>All Blogs:</h2>
      </div>

      {blogs?.map((blog: Blog) => {
        return (
          <div className="blogsDiv" key={blog.id}>
            <p className="blogHeading">
              <b>Blog Title:</b> {blog.title}
            </p>
            <i>written by:</i> {blog.author.toUpperCase()}
            <p className="blogDiv">
              <b className="blogHeading">Blog:</b> {blog.content}
            </p>
            <hr />
            <h3 className="blogsCommentsBtn">Comments:</h3>
            {blog?.comments?.map((comment: any, index: Number) => (
              <div key={comment.id}>
                <p style={{ fontSize: "18px" }}>
                  <b>{comment?.userName?.toUpperCase()}</b> {comment.content} .{" "}
                  <span
                    className="blogsReplyText"
                    onClick={() => onReplyToggle(index, blog)}
                  >
                    reply
                  </span>
                </p>
                <div className="blogsCommentsDiv">
                  {comment.replies.length > 0 && <i>replies:</i>}
                  {comment?.replies?.map((reply: any) => (
                    <p style={{ marginLeft: "4px" }} key={reply.id}>
                      <b>{reply?.userName?.toUpperCase()}: </b>
                      {reply.content}
                    </p>
                  ))}
                </div>
                {reply === index && blogReply === blog.id && (
                  <AddReply commentId={comment.id} />
                )}
              </div>
            ))}
            <AddComment blogId={blog.id} />
          </div>
        );
      })}
    </div>
  );
};

export default AllBlogs;
