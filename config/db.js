const environment = process.env.ENVIRONMENT || "development";
console.log(environment);
const config = require("../knexfile.js"); //[environment];
const knex = require("knex")(config);

// knex.migrate.latest([config]);
module.exports = knex;
