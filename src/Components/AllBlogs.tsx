import { useState } from "react";
import { useQuery } from "@apollo/client";

import AddComment from "./AddComment";
import AddReply from "./AddReply";
import { GET_BLOGS } from "../Graphql/Queries/Blogs/blogQueries";
import { Blog } from "../Types/types";

const AllBlogs = () => {
  const [reply, setReply] = useState<Number>(-1);
  const [blogReply, setBlogReply] = useState<Number>(-1);

  const [replyView, setReplyView] = useState<Number>(-1);
  const [blogReplyView, setBlogReplyView] = useState<Number>(-1);

  const onReplyToggle = (index: Number, blog: Blog) => {
    if (reply === index && blogReply === blog.id) {
      setReply(-1);
    } else {
      setReply(index);
      setBlogReply(blog.id);
    }
  };

  const onReplyView = (index: Number, blog: Blog): void => {
    if (replyView === index && blogReplyView === blog.id) {
      setReplyView(-1);
    } else {
      setReplyView(index);
      setBlogReplyView(blog.id);
    }
  };

  const isReplyView = (index: Number, blog: Blog): boolean => {
    if (replyView === index && blogReplyView === blog.id) {
      return true;
    } else {
      return false;
    }
  };

  const getLeftBorder = (index: Number, blog: Blog): string => {
    return isReplyView(index, blog) ? "2px solid black" : "";
  };

  const { loading, error, data } = useQuery(GET_BLOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;
  const blogs = data?.getBlogs;

  return (
    <div className="container">
      <div className="mainHeading">
        <h2>All Blogs:</h2>
      </div>

      {/* ALL BLOGS */}
      {blogs?.map((blog: Blog) => {
        return (
          <div className="blogsDiv" key={blog.id}>
            <p className="blogHeading">
              <b>Blog Title:</b> {blog.title}
            </p>
            {/* <i>written by:</i> {blog?.user?.name?.toUpperCase()} */}
            <p className="blogDiv">
              <b className="blogHeading">Blog:</b> {blog.content}
            </p>
            <hr />
            {/* COMMENTS SECTION */}
            <h3 className="blogsCommentsBtn">Comments:</h3>
            {blog?.comments?.map((comment: any, index: Number) => {
              const isReply = replyView === index && blogReplyView === blog.id;

              return (
                <div key={comment.id}>
                  <p className="blogComment">
                    {/* <b>{comment?.userName?.toUpperCase()}:</b> */}
                    {comment.content} .{" "}
                    <span
                      className="blogsReplyText"
                      onClick={() => onReplyToggle(index, blog)}
                    >
                      reply
                    </span>
                  </p>
                  {/* REPLIES SECTION */}
                  <div
                    className="blogsCommentsDiv"
                    style={{
                      borderLeft: getLeftBorder(index, blog),
                    }}
                  >
                    {comment?.replies?.length > 0 && (
                      <p
                        className="blogViewReplies"
                        onClick={() => onReplyView(index, blog)}
                      >
                        {isReply ? `hide replies` : `show replies`} (
                        {comment.replies.length})
                      </p>
                    )}
                    {isReply &&
                      comment?.replies?.map((reply: any) => (
                        <p className="blogReply" key={reply.id}>
                          {/* <b>{reply?.userName?.toUpperCase()}: </b> */}
                          {reply.content}
                        </p>
                      ))}
                  </div>
                  {/* ADD REPLY */}
                  {reply === index && blogReply === blog.id && (
                    <AddReply commentId={comment.id} />
                  )}
                </div>
              );
            })}
            <AddComment blogId={blog.id} />
          </div>
        );
      })}
    </div>
  );
};

export default AllBlogs;
