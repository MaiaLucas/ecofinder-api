module.exports = {
  client: "pg",
  connection: {
    url: process.env.DATABASE_URL,
    charset: "utf8",
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
