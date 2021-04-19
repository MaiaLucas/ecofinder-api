exports.up = function (knex) {
  return knex.schema.createTable("rating", function (table) {
    table.increments("id");
    table.float("rating");
    table.string("author").references("id").inTable("users");
    table.integer("place").references("id").inTable("places");
    table.integer("product").references("id").inTable("products");

    table.dateTime("create_at").defaultTo(knex.fn.now()).notNull();
    table.dateTime("update_at").defaultTo(knex.fn.now()).notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("rating");
};
