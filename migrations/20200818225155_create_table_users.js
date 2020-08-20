exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("usr_id").primary();
    table.string("usr_username").notNull();
    table.string("usr_email").notNull().unique();
    table.string("usr_password").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
