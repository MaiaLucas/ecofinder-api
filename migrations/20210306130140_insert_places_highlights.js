exports.up = function (knex) {
  return knex("places").insert([
    {
      title: "Ecoparque",
      description: "leve seu lixo",
      images_url: {},
      city: "Fortaleza",
      rating: 4.87,
      address: "Rua dos bobos, 0",
      phone: "(99) 999999999",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 2,
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
      title: "Ecoponto Fortaleza",
      description: "muito bonito",
      images_url: {
        images: [
          {
            path:
              "https://ecofinder-api-images-e28841c6-b9c1-4675-baa7-a0d2a11151a1.s3.amazonaws.com/1eb587a9a22d07989633d0cb427a4c34-sustainability.jpg",
          },
          {
            path:
              "https://ecofinder-api-images-e28841c6-b9c1-4675-baa7-a0d2a11151a1.s3.amazonaws.com/11578d96581ef03dbfc58466fb6cb96f-sustainably.png",
          },
        ],
      },
      city: "Fortaleza",
      rating: 5.0,
      address: "Rua dos bobos, 0",
      phone: "(99) 999999999",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 1,
    },
    {
      title: "Posto de Coleta São José",
      description: "Todo tipo de lixo",
      images_url: {
        images: [
          {
            path:
              "https://ecofinder-api-images-e28841c6-b9c1-4675-baa7-a0d2a11151a1.s3.amazonaws.com/1eb587a9a22d07989633d0cb427a4c34-sustainability.jpg",
          },
          {
            path:
              "https://ecofinder-api-images-e28841c6-b9c1-4675-baa7-a0d2a11151a1.s3.amazonaws.com/11578d96581ef03dbfc58466fb6cb96f-sustainably.png",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.99,
      address: "Rua dos bobos, 0",
      phone: "(99) 999999999",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 1,
    },
  ]);
};

exports.down = function (knex) {
  return knex("places").del();
};
