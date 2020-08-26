exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("types")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("types").insert([
        { id: 1, name: "Ponto de Coleta" },
        { id: 2, name: "Experiencias" },
        { id: 3, name: "Loja" },
      ]);
    });
};
