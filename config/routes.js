const multer = require('multer')
const multerConfig = require('./multer')

module.exports = (app) => {

  app.get("/health", app.api.health.work);
  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);

  // Usuários
  app
    .route("/user")
    .all(app.config.passport.authenticate())
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
    .post(app.config.passport.authenticate(), app.api.places.save)
    .get(app.api.places.listAll);

  app.get("/place/list/:place", app.api.places.listByLocal);
  app.get("/place/:id/list/:place", app.api.places.listByLocalType);

  app
    .route("/place/:id")
    .get(app.api.places.listById)
    .put(app.config.passport.authenticate(), app.api.places.save)
    .delete(app.config.passport.authenticate(), app.api.places.remove);

  app.get("/place/:id/list", app.api.places.listByType);

  // Informativos
  app
    .route("/info")
    .post(app.config.passport.authenticate(), app.api.info.save)
    .get(app.api.info.listAll);

  app
    .route("/info/:id")
    .put(app.config.passport.authenticate(), app.api.info.save)
    .get(app.api.info.listAll)
    .delete(app.config.passport.authenticate(), app.api.info.remove);

  // Tipos
  app.route("/type").get(app.api.types.listAll);
  app.route("/type/:id").get(app.api.types.listById);

  // upload images
  app.post("/upload", multer(multerConfig).single('file'), (req, res) => {
    
    console.log(req.file)
  
    return res.json({ massage: "Upload image" });
  });

};

