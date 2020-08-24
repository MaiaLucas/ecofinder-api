module.exports = (app) => {
  const work = (req, res) => {
    app.raw("Select 1;").then((_) => res.status(200).send("deu certo"));
  };

  return { work };
};
