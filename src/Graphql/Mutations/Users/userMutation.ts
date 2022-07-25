import { gql } from "@apollo/client";

//SIGNUP MUTATION
export const SIGNUP = gql`
  mutation Signup($createUserInputDTO: CreateUserInputDTO!) {
    signup(createUserInputDTO: $createUserInputDTO) {
      name
      email
      res {
        status
        msg
      }
    }
  }
`;

//LOGIN MUTATION
export const LOGIN = gql`
  mutation Login($loginPayloadDTO: LoginPayloadDTO!) {
    login(loginPayloadDTO: $loginPayloadDTO) {
      id
      jwt
    }
  }
`;
