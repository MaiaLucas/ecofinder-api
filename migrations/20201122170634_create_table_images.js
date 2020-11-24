exports.up = function(knex) {
  return knex.schema.createTable('images', function(table) {
    table.increments('id');
    table.string('originalname');
    table.decimal('size');
    table.string('filename');
    table.string('path');
    
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTable('images');
};
