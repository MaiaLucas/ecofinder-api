exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.string("id").primary();
    table.string("username").notNull();
    table.string("email").notNull().unique();
    table.string("password").notNull();
    table.dateTime("create_at").notNull();
    table.dateTime("update_at").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
