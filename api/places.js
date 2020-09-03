module.exports = (app) => {
  const { isEmpty } = app.api.validation;

  const save = (req, res) => {
    const place = { ...req.body };
    if (req.params.id) place.id = req.params.id;
    try {
      isEmpty(place.title, "Campo Título é obrigatório");
      isEmpty(place.state, "Campo Estado é obrigatório");
      isEmpty(place.city, "Campo Cidade é obrigatório");
      isEmpty(place.phone, "Campo Telefone é obrigatório");
      isEmpty(place.hr_init, "Campo Hora Inicial é obrigatório");
      isEmpty(place.hr_final, "Campo Hora Final é obrigatório");
      isEmpty(place.opening_days, "Campo Dias de Funcionamento é obrigatório");
      isEmpty(place.author, "Campo Autor é obrigatório");
      isEmpty(place.type, "Campo Type é obrigatório");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (place.id) {
      place.update_at = new Date(Date.now());

      app
        .db("places")
        .update(place)
        .where({ id: place.id })
        // .whereNull("deletedAt")
        .then((_) => res.status(200).send("Alterado com sucesso!"))
        .catch((err) => res.status(500).send(err));
    } else {
      place.create_at = new Date(Date.now());
      place.update_at = new Date(Date.now());

      app
        .db("places")
        .insert(place)
        .then((_) => res.status(200).send("Local cadastrado com Sucesso!"))
        .catch((err) => res.status(500).send(err));
    }
  };

  const listAll = (req, res) => {
    app
      .db("places")
      .select("*")
      .then((places) => res.json(places))
      .catch((err) => res.status(500).send(err));
  };

  const listByType = (req, res) => {
    app
      .db("places")
      .select("*")
      .where({ type: req.params.id })
      .then((places) => res.json(places))
      .catch((err) => res.status(500).send(err));
  };

  const listById = (req, res) => {
    app
      .db("places")
      .select("*")
      .where({ id: req.params.id })
      .first()
      .then((places) => res.json(places))
      .catch((err) => res.status(500).send(err));
  };

  const listByLocal = async (req, res) => {
    const places = await app.db.raw(
      `
        SELECT * 
        FROM places 
        WHERE 
          LOWER(city) LIKE LOWER('%${req.params.place.toLowerCase()}%')
          or LOWER(state) LIKE LOWER('%${req.params.place.toLowerCase()}%')
      `
    );
    const ids = places.rows.map((c) => c.id);

    app
      .db("places")
      .whereIn("id", ids)
      .orderBy("create_at", "desc")
      .then((places) => res.json(places))
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("places")
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

  return { save, listAll, listByType, listById, listByLocal, remove };
};
