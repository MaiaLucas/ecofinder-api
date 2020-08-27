exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("types")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("types").insert([
        {
          id: 1,
          name: "Ponto de Coleta",
          create_at: new Date(Date.now()),
          update_at: new Date(Date.now()),
        },
        {
          id: 2,
          name: "Experiencias",
          create_at: new Date(Date.now()),
          update_at: new Date(Date.now()),
        },
        {
          id: 3,
          name: "Loja",
          create_at: new Date(Date.now()),
          update_at: new Date(Date.now()),
        },
      ]);
    });
};
