exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.string("id").primary();
    table.string("first_name");
    table.string("last_name");
    table.string("type");
    table.string("email").notNull().unique();
    table.string("password").notNull();
    table.dateTime("create_at").notNull();
    table.dateTime("update_at").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
