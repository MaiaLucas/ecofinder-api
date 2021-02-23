const fs = require("fs");
const AWS = require("aws-sdk");
module.exports = (app) => {
  const { isEmpty } = app.api.validation;

  /**
   * função responsável por cadastrar um local
   */
  function create(req, res) {
    const place = { ...req.body };

    try {
      isEmpty(title, "Campo Título é obrigatório");
      isEmpty(city, "Campo Cidade é obrigatório");
      isEmpty(address, "Campo Endereço é obrigatório");
      isEmpty(phone, "Campo Telefone é obrigatório");
      isEmpty(hr_init, "Campo Hora Inicial é obrigatório");
      isEmpty(hr_final, "Campo Hora Final é obrigatório");
    } catch (msg) {
      return res.status(400).json({ message: msg });
    }

    const requestImages = req.files;

    const images = requestImages.map((image) => {
      return image.location;
    });

    place.images_url = req.files.length ? images.join(",") : place.images;

    place.create_at = new Date(Date.now());
    place.update_at = new Date(Date.now());

    app
      .db("places")
      .insert(place)
      .then((_) =>
        res.status(200).json({ message: "Local cadastrado com sucesso!" })
      )
      .catch((err) =>
        res.status(500).send({ message: "Internal Server Error" })
      );
  }

  /**
   * função responsável por editar um local
   */
  function edit(req, res) {
    const place = { ...req.body };

    if (!req.params.id)
      return res.status(400).json({ message: "Local não encontrado" });

    const { title, city, address, phone, hr_init, hr_final } = place;

    try {
      isEmpty(title, "Campo Título é obrigatório");
      isEmpty(city, "Campo Cidade é obrigatório");
      isEmpty(address, "Campo Endereço é obrigatório");
      isEmpty(phone, "Campo Telefone é obrigatório");
      isEmpty(hr_init, "Campo Hora Inicial é obrigatório");
      isEmpty(hr_final, "Campo Hora Final é obrigatório");
    } catch (error) {
      return res.status(400).json({ message: error });
    }

    const requestImages = req.files;

    const images = requestImages.map((image) => {
      return image.location;
    });

    place.images_url = req.files.length ? images.join(",") : place.images;

    place.update_at = new Date(Date.now());

    app
      .db("places")
      .update(place)
      .where({ id: req.params.id })
      .then((_) =>
        res.status(200).json({ message: "Local alterado com sucesso!" })
      )
      .catch((err) =>
        res.status(500).send({ message: "Internal Server Error" })
      );
  }

  /**
   * função responsável por deletar um local
   */
  async function remove(req, res) {
    try {
      const rowsDeleted = await app
        .db("places")
        .where({ id: req.params.id })
        .del();

      rowsDeleted && res.status(204).send();
    } catch (msg) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  /**
   * função responsável por listar os locais ordenando por classificação,
   * @param {*} page responsável pelo limite da listagem
   */
  function list(req, res) {
    const page = !req.query.page ? 4 : req.query.page;
    app
      .db("places")
      .select("title", "rating")
      .from("places")
      .orderBy("rating", "desc")
      .limit(page)
      .then((place) => res.json(place))
      .catch((err) =>
        res.status(500).send({ message: "Internal Server Error" })
      );
  }

  /**
   * função responsável por listar os locais ordenando por classificação,
   * @param {*} city responsável pela busca por cidade
   * @param {*} type responsável pela filtragem por tipo
   */
  async function listByCityType(req, res) {
    const type = !req.query.type ? "" : req.query.type;
    const city = !req.query.city ? "" : req.query.city.toLowerCase();
    const places = await app.db.raw(
      `
        SELECT id, title, rating
        FROM places
        WHERE 1 = 1
        ${type ? `AND type = ${type}` : ""}
        ${city ? `AND (LOWER(city) LIKE LOWER('%${city}%'))` : ""}
      `
    );
    const ids = places.rows.map((c) => c.id);

    app
      .db("places")
      .whereIn("id", ids)
      .orderBy("rating", "desc")
      .then((places) => res.json(places))
      .catch((err) =>
        res.status(500).send({ message: "Internal Server Error" })
      );
  }

  /**
   * função responsável por listar as cidades ao pesquisar
   */
  async function autocompleteCities(req, res) {
    const city = !req.query.city ? "" : req.query.city.toLowerCase();
    const places = await app.db.raw(
      `
        SELECT id
        FROM places
        WHERE 1 = 1
        ${city ? `AND (LOWER(city) LIKE LOWER('%${city}%'))` : ""}
        LIMIT 3
      `
    );
    const ids = places.rows.map((c) => c.id);

    app
      .db("places")
      .distinct("city")
      .whereIn("id", ids)
      .groupBy("city")
      .orderBy("city", "desc")
      .then((places) => res.json(places))
      .catch((err) =>
        res.status(500).send({ message: "Internal Server Error" })
      );
  }

  return {
    create,
    edit,
    remove,
    list,
    listByCityType,
    autocompleteCities,
  };
};
