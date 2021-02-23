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
  app.get("/dashboard", app.api.places.list);
  app.get("/search_place", app.api.places.listByCityType);
  app.get("/autocomplete", app.api.places.autocompleteCities);
};
