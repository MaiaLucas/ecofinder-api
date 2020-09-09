exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          email: "lustosa@gmail.com",
          username: "Emilly",
          password:
            "$2y$10$So5NOYW0OJkLf5t3MUaMEuPcyMksxLnzbTWpsyd2gkBpZ.sIjM71S",
          create_at: new Date(Date.now()),
          update_at: new Date(Date.now()),
        },
        {
          id: 2,
          email: "lucas@gmail.com",
          username: "Lucas",
          password:
            "$2y$10$9TNhnkRdbJKbDXe9P.6DUekUUWYla0HnZ.FefcTo3QbFkZjz5zULW",
          create_at: new Date(Date.now()),
          update_at: new Date(Date.now()),
        },
      ]);
    });
};
