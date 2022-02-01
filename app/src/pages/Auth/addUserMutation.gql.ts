import { gql } from "@apollo/client";

export default gql`
<<<<<<< HEAD
    mutation addUser($data: UserInput!){
      addUser(data: $data){
        id
        name
        token
  }
}`
=======
    mutation addUser($data: UserInput!) {
        addUser(data: $data) {
            id
            name
            token
        }
    }
`;
>>>>>>> fix linting
