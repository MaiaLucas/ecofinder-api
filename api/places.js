import * as Yup from "yup";
module.exports = (app) => {
  const { isEmpty } = app.api.validation;

  /**
   * função responsável por cadastrar um local
   */
  async function create(req, res) {
    const {
      title,
      type,
      city,
      address,
      phone,
      rating,
      hr_init,
      hr_final,
      open_on_weekend,
      description,
    } = req.body;

    const requestImages = req.files;
    const images = requestImages.map((image) => {
      return {
        path: image.location,
      };
    });

    const data = {
      title,
      type,
      city,
      address,
      rating: rating || 5.0,
      phone,
      hr_init,
      hr_final,
      open_on_weekend: open_on_weekend === "true",
      description,
      images_url: { images },
      create_at: new Date(),
      update_at: new Date(),
    };

    const schema = Yup.object().shape({
      title: Yup.string().required("Campo Titulo é obrigatório"),
      city: Yup.string().required("Campo Cidade é obrigatório"),
      address: Yup.string().required("Campo Endereço é obrigatório"),
      phone: Yup.string().required("Campo Telefone é obrigatório"),
      hr_init: Yup.string().required("Campo Hora Inicial é obrigatório"),
      hr_final: Yup.string().required("Campo Hora Final é obrigatório"),
      open_on_weekend: Yup.boolean(),
      description: Yup.string(),
      images_url: Yup.object().shape({
        images: Yup.array(
          Yup.object().shape({
            path: Yup.string().required(),
          })
        ),
      }),
    });

    try {
      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      const { errors } = error;
      return res.status(400).json({ message: errors });
    }

    app
      .db("places")
      .insert(data)
      .then((_) =>
        res.status(200).json({ message: "Local cadastrado com sucesso!" })
      )
      .catch((err) => {
        res.status(500).send({ message: "Internal Server Error" });
      });
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
    console.log(req.params);
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
    const page = !req.query.page ? 7 : req.query.page;
    app
      .db("places")
      .select("id", "title", "rating", "images_url as imagesUrl", "type")
      .from("places")
      .orderBy("rating", "desc")
      .limit(page)
      .then((place) => {
        const top2 = [place[1], place[2]];
        const highlight = place[0];
        place.splice(0, 3);
        const experience = place.filter((el) => el.type === 2);

        res.json({
          highlight,
          top2,
          experience,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
      });
  }

  /**
   * exibe os dados de um local especifico a partir do id
   * @param {Integer} id id do local
   */
  async function placeDetail(req, res) {
    const { id } = req.params;
    app
      .db("places")
      .select(
        "title",
        "rating",
        "description",
        "address",
        "city",
        "phone",
        "hr_init",
        "hr_final",
        "open_on_weekend",
        "images_url as imagesUrl"
      )
      .where("id", id)
      .limit(1)
      .then((place) => {
        res.json(...place);
        // return place;
      })
      .catch((err) => {
        res.status(500).send({ message: "Internal Server Error" });
      });
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
  async function cities(req, res) {
    const city = !req.query.city ? "" : req.query.city.toLowerCase();
    const places = await app.db.raw(
      `
        SELECT id
        FROM places
        WHERE 1 = 1
        ${city ? `AND (LOWER(city) LIKE LOWER('%${city}%'))` : ""}
        LIMIT 5
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
    cities,
    placeDetail,
  };
};
