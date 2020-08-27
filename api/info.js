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

  const listByTitle = (req, res) => {
    app
      .db("information")
      .select("*")
      .where({
        title: req.params.title,
      })
      .then((places) => res.json(places))
      .catch((err) => res.status(500).send(err));
  };

  return {
    save,
    listAll,
    listById,
    listByTitle,
  };
};
