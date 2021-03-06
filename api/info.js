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
      return res.status(400).json({ code: 400, message: msg });
    }

    if (info.id) {
      info.update_at = new Date(Date.now());
      app
        .db("information")
        .update(info)
        .where({
          id: info.id,
        })
        // .whereNull("deletedAt")
        .then((_) =>
          res.status(200).json({ code: 200, message: "Alterado com sucesso!" })
        )
        .catch((err) => res.status(500).json({ code: 500, message: msg }));
    } else {
      info.create_at = new Date(Date.now());
      info.update_at = new Date(Date.now());
      app
        .db("information")
        .insert(info)
        .then((_) =>
          res
            .status(200)
            .json({ code: 200, message: "Informativo cadastrado com Sucesso!" })
        )
        .catch((err) => res.status(500).json({ code: 500, message: msg }));
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

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("information")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Resultado não foi encontrado.");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  return {
    save,
    listAll,
    listById,
    listByTitle,
    remove,
  };
};
