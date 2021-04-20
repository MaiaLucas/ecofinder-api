const multer = require("multer");
const multerConfig = require("./multer");
const cookieParser = require("cookie-parser");

module.exports = (app) => {
  app.get("/health", app.api.health.work);

  app.post("/login", app.api.auth.login);

  app.post("/validate", cookieParser(), app.api.auth.validate);

  // Rotas de usuário
  app.post("/signup", cookieParser(), app.api.user.create);

  app.post("/recover", app.api.user.recover);

  app.get(
    "/reset_password/:token/:id",
    cookieParser(),
    app.api.user.resetPassword
  );

  app.get("/validate_password/:id", app.api.user.validadePassword);

  app.get("/user", app.api.user.list);

  app.get("/user/:id", app.api.user.findUser);

  app.put("/user/:id", multer(multerConfig).array("image"), app.api.user.edit);

  // Rotas para aba de locais
  /**
   * exemplos:
   * /dashboard?page=1
   * /search_place?city=fortaleza&type=1
   * /autocomplete?city=fortaleza
   */
  // Exibe os destaques
  app.get("/dashboard", app.api.places.dashboard);
  // Pesquisa pelos locais
  app.get("/search_place", app.api.places.listByCityType);

  //Retorna as cidades que estão sendo buscadas
  app.get("/cities", app.api.places.cities);

  // Cadastro de um ponto de coleta ou experiencia
  app.post(
    "/place",
    multer(multerConfig).array("images"),
    app.api.places.create
  );

  app.get("/place", app.api.places.list);

  // Exibe os detalhes de um ponto de coleta ou experiencia
  app.get("/place/detail/:id", app.api.places.placeDetail);

  // Remove um ponto de coleta ou experiencia
  app.post("/place/remove/:id", app.api.places.remove);

  // Rotas para aba de produtos
  app.post(
    "/product",
    multer(multerConfig).array("images"),
    app.api.store.create
  );

  app.delete("/product/:id", app.api.store.remove);

  app.put(
    "/product/:id",
    multer(multerConfig).array("images"),
    app.api.store.edit
  );

  app.get("/product", app.api.store.list);

  app.get("/product/search", app.api.store.search);

  app.get("/product/:id", app.api.store.detail);

  //Rotas relacionadas a classificação de um local ou produto
  app.post("/rating", app.api.rating.create);

  app.get("/rating", app.api.rating.getRating);
};
