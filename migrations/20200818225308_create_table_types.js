exports.up = function (knex) {
  return knex.schema.createTable("types", (table) => {
    table.increments("tps_id").primary();
    table.string("tps_name").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("types");
};
