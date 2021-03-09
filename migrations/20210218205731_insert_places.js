exports.up = function (knex) {
  return knex("places").insert([
    {
      title: "Ecoponto",
      description: "leve seu lixo",
      images_url: {},
      city: "Fortaleza",
      rating: 4.87,
      address: "Rua dos bobos, 0",
      phone: "(99) 999999999",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 1,
    },
    {
      title: "Ecopoint",
      description: "Passeio bacana",
      images_url: {},
      city: "Fortaleza",
      rating: 4.57,
      address: "Rua dos bobos, 0",
      phone: "(99) 999999999",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 2,
    },
    {
      title: "Passeio no Parque do Cocó",
      description: "muito sustentável",
      images_url: {},
      city: "Fortaleza",
      rating: 4.92,
      address: "Rua dos bobos, 0",
      phone: "(99) 999999999",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 2,
    },
  ]);
};

exports.down = function (knex) {
  return knex("places").del();
};
