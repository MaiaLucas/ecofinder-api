exports.up = function (knex) {
  return knex("places").insert([

  ]);
};

exports.down = function (knex) {
  return knex("places").del();
};
