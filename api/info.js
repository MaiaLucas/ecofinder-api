module.exports = (app) => {
  const { isEmpty } = app.api.validation;

  const save = (req, res) => {
    const info = {
      ...req.body,
    };
    if (req.params.id) info.id = req.params.id;
    try {
      isEmpty(info.title, "Campo Título é obrigatório");
      isEmpty(info.description, "Campo Descrição é obrigatório");
      isEmpty(info.author, "Campo Autor é obrigatório");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (info.id) {
      info.update_at = new Date(Date.now());
      app
        .db("information")
        .update(info)
        .where({
          id: info.id,
        })
        .whereNull("deletedAt")
        .then((_) => res.status(200).send("Alterado com sucesso!"))
        .catch((err) => res.status(500).send(err));
    } else {
      info.create_at = new Date(Date.now());
      info.update_at = new Date(Date.now());
      app
        .db("information")
        .insert(info)
        .then((_) =>
          res.status(200).send("Informativo cadastrado com Sucesso!")
        )
        .catch((err) => res.status(500).send(err));
    }
  };

  const listAll = (req, res) => {
    app
      .db("information")
      .select("*")
      .orderBy("create_at", "desc")
      .then((information) => res.json(information))
      .catch((err) => res.status(500).send(err));
  };

  const listById = (req, res) => {
    app
      .db("information")
      .select("*")
      .where({
        id: req.params.id,
      })
      .first()
      .then((places) => res.json(places))
      .catch((err) => res.status(500).send(err));
  };

  const listByTitle = async (req, res) => {
    const query = await app.db.raw(
      `
          SELECT * 
          FROM information 
          WHERE 
            LOWER(title) LIKE LOWER('%${req.params.title.toLowerCase()}%')
        `
    );
    const ids = query.rows.map((c) => c.id);

    app
      .db("information")
      .select("*")
      .whereIn("id", ids)
      .orderBy("create_at", "desc")
      .then((info) => res.json(info))
      .catch((err) => res.status(500).send(err));
  };

  return {
    save,
    listAll,
    listById,
    listByTitle,
  };
};
