exports.up = function (knex) {
  return knex("places").insert([
    {
      title: "Ecoparque",
      description: "leve seu lixo",
      images_url: "",
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
      images_url: "",
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
      images_url:
        "https://www.fortaleza.ce.gov.br/images/Ecopontos/Ecoponto-L48A0413.JPG",
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
      images_url:
        "https://www.fortaleza.ce.gov.br/images/Ecopontos/Ecoponto-L48A0413.JPG",
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
