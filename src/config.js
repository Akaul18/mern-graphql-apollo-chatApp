export const {
  PORT = 4000,
  NODE_ENV = "development",
  DB_USERNAME = "",
  DB_PASSWORD = "yourUsername",
  DB_HOST = "yourPassword",
  DB_PORT = 27017,
  DB_NAME = "graphql-chat"
} = process.env;

export const IN_PRODUCTION = NODE_ENV === "production";
