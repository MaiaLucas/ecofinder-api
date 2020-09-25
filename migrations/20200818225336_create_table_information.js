exports.up = function (knex) {
  return knex.schema.createTable("information", (table) => {
    table.increments("id").primary();
    table.string("title").notNull();
    table.string("description", 1000).notNull();
    table.binary("content").notNull();
    table.string("image_url", 1000);
    table.dateTime("create_at").notNull();
    table.dateTime("update_at").notNull();

    // chaves estrangeiras
    table.string("author").references("id").inTable("users").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("information");
};
