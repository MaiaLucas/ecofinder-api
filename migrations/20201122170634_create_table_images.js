exports.up = function (knex) {
	return knex.schema.createTable("images", function (table) {
		table.increments("id");
		table.string("name");
		table.decimal("size");
		table.string("url");

		table.dateTime("create_at").defaultTo(knex.fn.now()).notNull();
		table.dateTime("update_at").defaultTo(knex.fn.now()).notNull();

		// chaves estrangeiras
		table.integer("place_id").references("id").inTable("places").notNull();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("images");
};
