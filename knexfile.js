const { db } = process.env.DATABASE_URL || require("./.env.develop");

module.exports = {
  client: "postgresql",
  connection: db,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

// module.exports = {
//   // development: {
//   client: "postgresql",
//   connection: db,
//   pool: {
//     min: 2,
//     max: 10,
//   },
//   migrations: {
//     tableName: "knex_migrations",
//   },
//   seeds: {
//     directory: "./seeds",
//   },
//   // },

//   // production: {
//   //   client: "pg",
//   //   connection: process.env.DATABASE_URL,
//   //   migrations: {
//   //     tableName: "knex_migrations",
//   //   },
//   //   // seeds: {
//   //   //   directory: "./seeds",
//   //   // },
//   // },
// };
