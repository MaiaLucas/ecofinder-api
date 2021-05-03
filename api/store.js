import * as Yup from "yup";

module.exports = (app) => {
  async function create(req, res) {
    const {
      title,
      instagram_account,
      facebook_link,
      author,
      price,
      description,
    } = req.body;

    // if (!author)
    // return res.status(500).send({ error: "Internal Server Error" });

    const requestImages = req.files;
    const images =
      requestImages &&
      requestImages.map((image) => {
        return {
          path: image.location,
        };
      });
    const random = Math.random() * 10;
    const rating = random > 5 ? random - 5 : random;

    const data = {
      title,
      instagram_account,
      facebook_link,
      images_url: { images },
      create_at: new Date(),
      update_at: new Date(),
      author,
      price,
      description,
      rating: parseFloat(rating.toFixed(3)),
    };

    const schema = Yup.object().shape({
      title: Yup.string().required("Campo Titulo é obrigatório"),
      price: Yup.number(),
      facebook_link: Yup.string(),
      instagram_account: Yup.string(),
    });

    try {
      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      const { errors } = error;
      return res.status(400).json({ error: errors });
    }

    try {
      await app.db("products").insert(data);
      return res.status(200).json({ message: "Produto criado" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async function edit(req, res) {
    const { title, instagram_account, facebook_link, author, price } = req.body;

    if (!req.params.id)
      res.status(400).send({ message: "Produto não encontrado" });
    if (!author) res.status(500).send({ message: "Internal Server Error" });

    const requestImages = req.files;
    const images = requestImages.map((image) => {
      return {
        path: image.location,
      };
    });

    const data = {
      title,
      instagram_account,
      facebook_link,
      images_url: { images },
      update_at: new Date(),
      author,
      price,
    };

    const schema = Yup.object().shape({
      title: Yup.string(),
      price: Yup.number(),
      facebook_link: Yup.string(),
      instagram_account: Yup.string(),
    });

    try {
      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      const { errors } = error;
      return res.status(400).json({ message: errors });
    }

    app
      .db("products")
      .update(data)
      .where({ id: req.params.id })
      .then((_) => res.status(200).json({ message: "Produto alterado" }))
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  }

  async function remove(req, res) {
    try {
      const rowsDeleted = await app
        .db("products")
        .where({ id: req.params.id })
        .del();

      rowsDeleted && res.status(204).send();
    } catch (msg) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async function list(req, res) {
    const orderBy = req.query.order_by || "asc";
    app
      .db("products")
      .select(
        "id",
        "title",
        "rating",
        "images_url as imagesUrl",
        "facebook_link as fbLink",
        "instagram_account as instagram",
        "author",
        "price",
        "description"
      )
      .from("products")
      .orderBy("id", orderBy)
      .then((products) => {
        res.json({ length: products.length, products });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
      });
  }

  async function search(req, res) {
    const products = req.query.product;
    app
      .db("products")
      .select("id", "title", "rating", "images_url")
      .where(app.db.raw(`LOWER("title") LIKE LOWER('%${products}%')`))
      .from("products")
      .orderBy("rating", "desc")
      .limit(6)
      .then((products) => {
        res.json(products);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error!" });
      });
  }

  async function detail(req, res) {
    const { id } = req.params;
    app
      .db("products")
      .select(
        "id",
        "title",
        "rating",
        "images_url as imagesUrl",
        "facebook_link as fbLink",
        "instagram_account as instagram",
        "author",
        "price",
        "description"
      )
      .where({ id: id })
      .from("products")
      .then((product) => res.json(...product))
      .catch((err) =>
        res.status(500).send({ message: "Internal Server Error!!" })
      );
  }

  return { create, remove, edit, list, search, detail };
};
