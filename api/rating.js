import * as Yup from "yup";
module.exports = (app) => {
  /**
   * Dá uma nota há um local ou produto
   * @param {Request} req
   * @param {Response} res
   * @returns retorna uma mensagem podendo ser de erro ou sucesso
   */
  async function create(req, res) {
    const { value, author, place, product } = req.body;

    const data = { rating: value, author, place, product };

    const schema = Yup.object().shape({
      rating: Yup.number().required("É necessário passar um valor!"),
    });

    try {
      await schema.validate(data);
    } catch (err) {
      const { errors } = err;
      return res.status(422).json({ message: errors });
    }

    app
      .db("rating")
      .insert(data)
      .then((_) => {
        res.status(200).json({ message: "Obrigado pela sua classificação" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function edit(req, res) {}

  /**
   * @param {Request} req
   * @param {Response} res
   * ex: target = {product: 1} || {place: 10}
   */
  async function getRating(req, res) {
    const { product, place } = req.query;

    const target = !place ? { product } : { place };

    console.log(target);
    try {
      const avgRating = await app.db("rating").avg("rating").where(target);

      return res.status(200).json({ rating: avgRating[0].avg });
    } catch (err) {
      console.log(err);
      return res.status(422).json({ message: "Deu Ruim" });
    }
  }

  return {
    create,
    getRating,
  };
};
