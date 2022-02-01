import { gql } from "@apollo/client";

export default gql`
    mutation addUser($data: UserInput!){
        addUser(data: $data){
          id
          name
          token
        }
      }`
      

      