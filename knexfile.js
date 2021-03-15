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
    connection: process.env.DB_URL,
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
