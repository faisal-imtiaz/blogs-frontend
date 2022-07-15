import { useState } from "react";
import { useQuery } from "@apollo/client";

import AddComment from "./AddComment";
import ShowReplies from "./ShowReplies";
import AddReply from "./AddReply";
import { GET_MY_BLOGS } from "../Graphql/Queries/Blogs/blogQueries";
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

  const { loading, error, data } = useQuery(GET_MY_BLOGS, {
    variables: {
      id: localStorage.getItem("user"),
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;
  const blogs = data?.getMyBlogs;
  return (
    <div className="container">
      <div className="mainHeading">
        <h2>My Blogs:</h2>
      </div>

      {/* ALL BLOGS */}
      {blogs?.map((blog: Blog) => {
        return (
          <div className="blogsDiv" key={blog.id}>
            <p className="blogHeading">
              <b>Blog Title:</b> {blog.title}
            </p>
            <i>written by:</i> {blog?.user?.name?.toUpperCase()}
            <p className="blogDiv">
              <b className="blogHeading">Blog:</b> {blog.content}
            </p>
            <hr />
            {/* COMMENTS SECTION */}
            <h3 className="blogsCommentsBtn">Comments:</h3>
            {blog?.comments?.map((comment: any, index: Number) => {
              return (
                <div key={comment.id}>
                  <p className="blogComment">
                    <b>{comment?.user?.name?.toUpperCase()}: </b>
                    {comment.content} .{" "}
                    <span
                      className="blogsReplyText"
                      onClick={() => onReplyToggle(index, blog)}
                    >
                      reply
                    </span>
                  </p>
                  {/* REPLIES SECTION */}
                  <ShowReplies commentid={comment.id} />

                  {/* ADD REPLY */}
                  {reply === index && blogReply === blog.id && (
                    <AddReply commentId={comment.id} />
                  )}
                </div>
              );
            })}
            {/* ADD COMMENT */}
            <AddComment blogId={blog.id} />
          </div>
        );
      })}
    </div>
  );
};

export default AllBlogs;
