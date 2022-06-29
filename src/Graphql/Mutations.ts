import { gql } from "@apollo/client";

//SIGNUP MUTATION
export const SIGNUP = gql`
  mutation Signup($signupDTO: SignupDTO!) {
    signup(signupDTO: $signupDTO)
  }
`;

//LOGIN MUTATION
export const LOGIN = gql`
  mutation Login($loginDTO: LoginDTO!) {
    login(loginDTO: $loginDTO) {
      id
      jwt
    }
  }
`;

//NEW-COMMENT MUTATION
export const NEW_COMMENT = gql`
  mutation NewComment($createCommentDTO: CreateCommentDTO!) {
    newComment(createCommentDTO: $createCommentDTO)
  }
`;

//NEW-REPLY MUTATION
export const NEW_REPLY = gql`
  mutation NewReply($newReplyDTO: NewReplyDTO!) {
    newReply(newReplyDTO: $newReplyDTO)
  }
`;

//NEW-BLOG MUTATION
export const NEW_BLOG = gql`
  mutation NewBlog($createBlogDTO: CreateBlogDTO!) {
    newBlog(createBlogDTO: $createBlogDTO) {
      id
      title
      content
      userid
    }
  }
`;
