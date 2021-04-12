exports.up = function (knex) {
  return knex("products").insert([
    {
      title: "Escova de bambu",
      images_url: {},
      instagram_account: "@minhaloja",
      rating: 4.87,
      price: (Math.random() * 1000).toFixed(2),
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      title: "Ecogarrafinha",
      images_url: {},
      instagram_account: "@minhaloja",
      rating: 4.7,
      price: (Math.random() * 1000).toFixed(2),
      create_at: new Date(),
      update_at: new Date(),
      description: "Esse produto é muito bom e sustentavel",
    },
    {
      title: "Ecobag",
      images_url: {},
      instagram_account: "@minhaloja",
      rating: 5.0,
      price: (Math.random() * 1000).toFixed(2),
      create_at: new Date(),
      update_at: new Date(),
      description: "Esse produto é muito bom e sustentavel",
    },
    {
      title: "Canudo de bambu",
      images_url: {},
      instagram_account: "@minhaloja",
      rating: 4.5,
      price: (Math.random() * 1000).toFixed(2),
      create_at: new Date(),
      update_at: new Date(),
      description: "Esse produto é muito bom e sustentavel",
    },
  ]);
};

exports.down = function (knex) {
  return knex("products").del();
};
