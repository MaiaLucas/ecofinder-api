// const { db } = require("./.env.develop");
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      port: process.env.DATABASE_PORT,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_ACCESS_KEY,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      // tableName: "knex_migrations",
      directory: __dirname + "/migrations",
    },
    seeds: {
      directory: __dirname + "/seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL, // + `postgres://fdsgoajmcobuyb:fc7456ca634a09f82354d666ce7729e15f7579782244147f7feb6d390053c5ea@ec2-54-164-22-242.compute-1.amazonaws.com:5432/d5g4ibnlq737l4?ssl=true`,
    ssl: true,
    migrations: {
      // tableName: "knex_migrations",
      directory: __dirname + "/migrations",
    },
    seeds: {
      directory: __dirname + "/seeds",
    },
  },
};
