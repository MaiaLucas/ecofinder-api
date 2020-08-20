exports.up = function (knex) {
  return knex.schema.createTable("information", (table) => {
    table.increments("inf_id").primary();
    table.string("inf_title").notNull();
    table.string("inf_description", 1000).notNull();
    table.string("inf_image_url", 1000);

    // chaves estrangeiras
    table.integer("inf_author").references("usr_id").inTable("users").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("information");
};
