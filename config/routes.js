module.exports = (app) => {
  app.get("/health", app.api.user.save);

  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);

  app.post("/user", app.api.user.save);
};
