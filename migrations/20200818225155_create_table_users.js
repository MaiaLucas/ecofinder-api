exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").notNull();
    table.string("email").notNull().unique();
    table.string("password").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
