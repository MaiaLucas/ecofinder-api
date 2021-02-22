exports.up = function (knex) {
  return knex.schema.createTable("places", (table) => {
    table.increments("id").primary();
    table.string("title").notNull();
    table.string("description", 1000);
    table.string("images_url", 1000);
    table.float("rating");
    table.string("city").notNull();
    table.string("address");
    table.float("latitude");
    table.float("longitude");
    table.string("phone").notNull();
    table.string("hr_init");
    table.string("hr_final");
    table.boolean("open_on_weekend").notNull();
    table.dateTime("create_at").notNull();
    table.dateTime("update_at").notNull();

    // chaves estrangeiras
    table.string("author").references("id").inTable("users");
    table.integer("type").references("id").inTable("types").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("places");
};
