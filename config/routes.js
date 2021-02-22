const multer = require("multer");
const multerConfig = require("./multer");

module.exports = (app) => {
  app.get("/health", app.api.health.work);

  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);

  // Usuários
  app
    .route("/user")
    // .all(app.config.passport.authenticate())
    .post(app.api.user.save)
    .get(app.api.user.listAll);

  app
    .route("/user/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.user.save)
    .get(app.api.user.listById);

  // Locais
  app
    .route("/place")
    .post(multer(multerConfig).array("images"), app.api.places.save)
    .get(app.api.places.listAll);

  app.get("/city/:city", app.api.places.listByCity);

  app.get("/place/rating", app.api.places.listByRating);

  app
    .route("/place/:id")
    .get(app.api.places.listById)
    .put(
      // app.config.passport.authenticate(),
      multer(multerConfig).array("images"),
      app.api.places.save
    )
    .delete(app.api.places.remove);

  app.get("/place/:id/list", app.api.places.listByType);

  app.route("/images/:id").get(app.api.places.listImagesById);

  // Tipos
  app.route("/type").get(app.api.types.listAll);
  app.route("/type/:id").get(app.api.types.listById);
};
