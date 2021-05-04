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

  app.put("/user/:id", multer(multerConfig).array("avatar"), app.api.user.edit);

  app.get("/dashboard", app.api.places.dashboard);
  app.get("/search_place", app.api.places.listByCityType);

  app.post(
    "/place",
    multer(multerConfig).array("images"),
    app.api.places.create
  );
  app.get("/place", app.api.places.list);

  app.get("/place/detail/:id", app.api.places.placeDetail);

  app.post("/place/remove/:id", app.api.places.remove);

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

  app.post("/rating", app.api.rating.create);

  app.get("/rating", app.api.rating.getRating);
};
