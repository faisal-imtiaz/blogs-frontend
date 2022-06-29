import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query GetBlogs {
    getBlogs {
      id
      title
      content
      userid
      author
      comments {
        id
        content
        userid
        blogid
        userName
        replies {
          id
          content
          commentid
          userName
        }
      }
    }
  }
`;
