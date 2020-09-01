module.exports = (app) => {
  app.get("/health", app.api.health.work);

  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);

  // Usuários
  app.post("/user", app.api.user.save, app.config.passport.authenticate());
  app.get(
    "/user/list",
    app.api.user.listAll,
    app.config.passport.authenticate()
  );

  // Locais
  app.post("/place", app.api.places.save, app.config.passport.authenticate());
  app.get("/place/list", app.api.places.listAll);
  app.get("/place/list/:place", app.api.places.listByLocal);
  app.get("/place/:id", app.api.places.listById);
  app.get("/place/:id/list", app.api.places.listByType);

  // Informativos
  app.post("/info", app.api.info.save, app.config.passport.authenticate());
  app.get("/info/list", app.api.info.listAll);
};
