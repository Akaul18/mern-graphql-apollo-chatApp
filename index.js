const { ApolloServer, gql } = require("apollo-server");
const crypto = require("crypto");

const db = {
  users: [
    {
      id: "1",
      email: "ankur@gmail.com",
      name: "Ankur",
      avatarUrl: "https://abcd.com/"
    },
    {
      id: "2",
      email: "kaul@gmail.com",
      name: "kaul",
      avatarUrl: "https://abcd.com/"
    }
  ],
  messages: [
    { id: "1", userId: "1", body: "hello", create_time: Date.now() },
    { id: "2", userId: "2", body: "hi", create_time: Date.now() },
    { id: "3", userId: "1", body: "Whats's up?", create_time: Date.now() }
  ]
};

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    messages: [Message!]!
  }

  type Mutation {
    addUser(email: String!, name: String): User
  }

  type User {
    id: ID!
    email: String!
    name: String
    avatarUrl: String
    messages: [Message!]!
  }

  type Message {
    id: ID!
    body: String!
    create_time: String
  }
`;

const resolvers = {
  Query: {
    users: () => db.users,
    user: (root, args) => db.users.find(user => user.id === args.id),
    messages: () => db.messages
  },

  Mutation: {
    addUser: (root, { email, name }) => {
      const user = {
        id: crypto.randomBytes(10).toString("hex"),
        email,
        name
      };
      db.users.push(user);
      return user;
    }
  },

  User: {
    messages: user => db.messages.filter(message => message.userId === user.id) //here the argument root is actually user
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(url));
