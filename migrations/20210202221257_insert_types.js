exports.up = function (knex) {
  return knex("types").insert([
    {
      name: "E-coleta",
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      name: "Experiencias",
      create_at: new Date(),
      update_at: new Date(),
    },
  ]);
};

exports.down = function (knex) {
  return knex("types").del();
};
