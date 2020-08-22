exports.up = function (knex) {
  return knex.schema.createTable("information", (table) => {
    table.increments("id").primary();
    table.string("title").notNull();
    table.string("description", 1000).notNull();
    table.string("image_url", 1000);

    // chaves estrangeiras
    table.integer("author").references("id").inTable("users").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("information");
};
