module.exports = (app) => {
  app.get("/health", app.api.health.work);

  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);

  // Usuários
  app.post("/user", app.api.user.save);
  app.get("/list", app.api.user.listAll);

  // Locais
  app.post("/place", app.api.places.save);
  app.get("/place/list", app.api.places.listAll);
  app.get("/place/:id", app.api.places.listById);
  app.get("/place/:id/list", app.api.places.listByType);
};
