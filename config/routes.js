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
};
