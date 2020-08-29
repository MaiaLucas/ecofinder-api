// const { db } = require("./.env.develop");
require("dotenv").config();
console.log(process.env.DATABASE_URL);
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
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },

  production: {
    client: "pg",
    // connection: {
    //   port: process.env.DB_PORT,
    //   host: process.env.DB_HOST,
    //   database: process.env.DB_NAME,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_ACCESS_KEY,
    // },
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
    },
    // seeds: {
    //   directory: "./seeds",
    // },
  },
};
