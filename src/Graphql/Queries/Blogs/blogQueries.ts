import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query GetBlogs {
    getBlogs {
      id
      title
      content
      user {
        name
      }
      comments {
        id
        content
        # replies {
        #   id
        #   content
        # }
      }
    }
  }
`;
