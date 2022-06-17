import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup(
    $id: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(id: $id, name: $name, email: $email, password: $password) {
      name
      email
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      jwt
    }
  }
`;

export const NEW_COMMENT = gql`
  mutation NewComment(
    $id: String!
    $content: String!
    $userid: String!
    $blogid: String!
  ) {
    newComment(id: $id, content: $content, userid: $userid, blogid: $blogid) {
      id
      content
      userid
      blogid
    }
  }
`;

export const NEW_REPLY = gql`
  mutation NewReply(
    $id: String!
    $content: String!
    $commentid: String!
    $userid: String!
  ) {
    newReply(
      id: $id
      content: $content
      commentid: $commentid
      userid: $userid
    ) {
      id
      content
      commentid
      userName
    }
  }
`;

export const NEW_BLOG = gql`
  mutation NewBlog(
    $id: String!
    $title: String!
    $content: String!
    $userid: String!
  ) {
    newBlog(id: $id, title: $title, content: $content, userid: $userid) {
      id
      title
      content
      userid
    }
  }
`;
