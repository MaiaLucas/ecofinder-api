exports.up = function (knex) {
  return knex.schema.createTable("places", (table) => {
    table.increments("plc_id").primary();
    table.string("plc_title").notNull();
    table.string("plc_description", 1000).notNull();
    table.string("plc_images_url", 1000);
    table.string("plc_address", 1000);
    table.string("plc_state").notNull();
    table.string("plc_city").notNull();
    table.string("plc_phone").notNull();
    table.string("plc_hr_init").notNull();
    table.string("plc_hr_final").notNull();
    table.string("plc_opening_days").notNull();

    // chaves estrangeiras
    table.integer("plc_author").references("usr_id").inTable("users").notNull();
    table.integer("plc_type").references("tps_id").inTable("types").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("places");
};
