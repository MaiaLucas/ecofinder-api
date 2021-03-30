const multer = require("multer");
const multerConfig = require("./multer");

module.exports = (app) => {
  app.get("/health", app.api.health.work);

  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);

  // Rotas para aba de locais
  /**
   * exemplos:
   * /dashboard?page=1
   * /search_place?city=fortaleza&type=1
   * /autocomplete?city=fortaleza
   */
  // Exibe os destaques
  app.get("/dashboard", app.api.places.list);
  // Pesquisa pelos locais
  app.get("/search_place", app.api.places.listByCityType);

  //Retorna as cidades que estão sendo buscadas
  app.get("/cities", app.api.places.cities);

  // Cadastro de um ponto de coleta ou experiencia
  app.post(
    "/place/create",
    multer(multerConfig).array("images"),
    app.api.places.create
  );

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
};
