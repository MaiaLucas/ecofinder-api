module.exports = (app) => {
  const work = (req, res) => {
    app.db.context
      .raw("Select 1;")
      .then((_) => res.status(200).send("conexão feita"))
      .catch((err) => console.log(err));
  };

  return { work };
};
