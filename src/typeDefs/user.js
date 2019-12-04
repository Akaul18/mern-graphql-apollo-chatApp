import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    user(is: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    signUp(
      email: String!
      username: String!
      name: String!
      password: String!
    ): User
  }

  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    create_date: String!
  }
`;
