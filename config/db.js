const environment = process.env.ENVIRONMENT || "development";
console.log("environment -> ", environment);
console.log("database -> ", process.env.DATABASE_URL);
const config = require("../knexfile.js")[environment];
const knex = require("knex")(config);
console.log(knex);
// knex.migrate.latest([config]);
module.exports = knex;
