const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const crypto = require("crypto");
const app = express();

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

class User {
  constructor(user) {
    Object.assign(this, user);
  }

  get messages() {
    return db.messages.filter(message => message.userId === this.id);
  }
}

const schema = buildSchema(`
    type Query{
        users: [User!]!
        user(id: ID!): User
        messages: [Message!]!
    }

    type Mutation{
        addUser(email:String!,name:String): User
    }

    type User{
        id: ID!,
        email: String!,
        name: String,
        avatarUrl: String
        messages: [Message!]!
    }

    type Message{
        id: ID!
        body: String!
        create_time: String
    }
`);

const rootValue = {
  //   message: () => "graphql works" //  it is the resolver and the name should be same as type key
  users: () => db.users.map(user => new User(user)),
  user: args => db.users.find(user => user.id === args.id),
  messages: () => db.messages,
  addUser: ({ email, name }) => {
    // args is the arguments that will be passed with your query to the graphql endpoint we can destructure args with {email, name}
    const user = {
      id: crypto.randomBytes(10).toString("hex"),
      email,
      name
    };
    db.users.push(user);
    return user;
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
); //we use this to hook up express with graphql

app.listen(3000, () => console.log(`listening on port 3000`));

// graphql(
//   schema,

//   `
//     {
//       users {
//         id
//         email
//       }
//     }
//   `,

//   //   `
//   //     {
//   //       message
//   //     }
//   //   `, //  query(this will be the actual  graphql query that we need to execute)
//   rootValue //its a resolver or root resolver function
// )
//   .then(res => console.dir(res, { depth: null }))
//   .catch(console.error); //graphql function will give us a promise so we can use then
