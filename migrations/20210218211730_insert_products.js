exports.up = function (knex) {
  return knex("products").insert([
    {
      title: "Escova de bambu",
      images_url: {},
      instagram_account: "@minhaloja",
      rating: 4.87,
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      title: "Ecogarrafinha",
      images_url: {},
      instagram_account: "@minhaloja",
      rating: 4.7,
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      title: "Ecobag",
      images_url: {},
      instagram_account: "@minhaloja",
      rating: 5.0,
      create_at: new Date(),
      update_at: new Date(),
    },
    {
      title: "Canudo de bambu",
      images_url: {},
      instagram_account: "@minhaloja",
      rating: 4.5,
      create_at: new Date(),
      update_at: new Date(),
    },
  ]);
};

exports.down = function (knex) {
  return knex("products").del();
};
