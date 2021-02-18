exports.up = function (knex) {
  return knex.schema.createTable("places", (table) => {
    table.increments("id").primary();
    table.string("title").notNull();
    table.string("description", 1000);
    table.string("images_url", 1000);
    table.float("rating");
    table.string("city").notNull();
    table.float("latitude").notNull();
    table.float("longitude").notNull();
    table.string("phone").notNull();
    table.string("hr_init").notNull();
    table.string("hr_final").notNull();
    table.string("opening_days").notNull();
    table.dateTime("create_at").notNull();
    table.dateTime("update_at").notNull();

    // chaves estrangeiras
    table.string("author").references("id").inTable("users").notNull();
    table.integer("type").references("id").inTable("types").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("places");
};
