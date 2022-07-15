import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  query GetBlogs {
    getBlogs {
      id
      title
      content
      user {
        id
        name
      }
      comments {
        id
        content
        replyCount
        user {
          name
        }
      }
    }
  }
`;

export const GET_MY_BLOGS = gql`
  query GetMyBlogs($id: String!) {
    getMyBlogs(id: $id) {
      id
      title
      content
      user {
        id
        name
      }
      comments {
        id
        content
        user {
          name
        }
      }
    }
  }
`;

export const GET_REPLIES = gql`
  query GetReplies($id: String!) {
    getReplies(id: $id) {
      id
      content
      user {
        name
      }
    }
  }
`;
