module.exports = (app) => {
  const work = (req, res) => {
    app.db.context
      .raw("Select 1;")
      .then((_) => res.status(200).send("entrou de forma correta"));
  };

  return { work };
};
