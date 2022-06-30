import { gql } from "@apollo/client";

//CREATE-BLOG MUTATION
export const CREATE_BLOG = gql`
  mutation CreateBlog($createBlogInputDTO: CreateBlogInputDTO!) {
    createBlog(createBlogInputDTO: $createBlogInputDTO) {
      id
      title
      content
    }
  }
`;

//CREATE-COMMENT MUTATION
export const CREATE_COMMENT = gql`
  mutation CreateComment($createCommentInputDTO: CreateCommentInputDTO!) {
    createComment(createCommentInputDTO: $createCommentInputDTO) {
      content
    }
  }
`;

//CREATE-REPLY MUTATION
export const CREATE_REPLY = gql`
  mutation CreateReply($createReplyInputDTO: CreateReplyInputDTO!) {
    createReply(createReplyInputDTO: $createReplyInputDTO) {
      content
    }
  }
`;
