import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query GetBlogs {
    blogs {
      id
      title
      content
      userid
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
