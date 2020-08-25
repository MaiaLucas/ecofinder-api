const app = require("express")();
const consign = require("consign");
const db = require("./config/db");

app.db = db; //knex

const port = 3000;
consign()
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

app.get("/", (req, res) => {
  res.send("Master working");
});

app.listen(process.env.PORT || port);
