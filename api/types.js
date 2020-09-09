module.exports = (app) => {
  const listAll = (req, res) => {
    app
      .db("types")
      .select("*")
      .orderBy("create_at", "desc")
      .then((types) => res.json(types))
      .catch((err) => res.status(500).send(err));
  };

  const listById = (req, res) => {
    app
      .db("types")
      .select("*")
      .where({
        id: req.params.id,
      })
      .first()
      .then((type) => res.json(type))
      .catch((err) => res.status(500).send(err));
  };

  return {
    listAll,
    listById,
  };
};
