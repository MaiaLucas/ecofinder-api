exports.up = function (knex) {
  return knex.schema.createTable("types", (table) => {
    table.increments("id").primary();
    table.string("name").notNull();
    table.dateTime("create_at").notNull();
    table.dateTime("update_at").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("types");
};
