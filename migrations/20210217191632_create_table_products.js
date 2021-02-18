exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("title").notNull();
    table.string("description", 1000);
    table.string("images_url", 1000);
    table.float("rating");
    table.string("instagram_account", 1000);
    table.string("facebook_link", 1000);
    table.dateTime("create_at").notNull();
    table.dateTime("update_at").notNull();

    // chaves estrangeiras
    table.string("author").references("id").inTable("users").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
