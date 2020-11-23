 const { uuid } = require("uuidv4");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: uuid(),
          email: "maria@email.com",
          username: "Maria",
          password:
            "$2a$10$c8Alsq1FDvbLEOP4cL0bAe/7K9kHM2EsYVxSfS4.v5LRl.OLVKgbq",
          create_at: new Date(Date.now()),
          update_at: new Date(Date.now()),
        },
        {
          id: uuid(),
          email: "joao1234@gmail.com",
          username: "João Henrique",
          password:
            "$2a$10$U4UbnKNz9BelWuOLPVcfxujuqvmgjQautlGPJCa9sH9iMM7jHh4Wi",
          create_at: new Date(Date.now()),
          update_at: new Date(Date.now()),
        },
      ]);
    });
};
