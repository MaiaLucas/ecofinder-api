const app = require("express")();
const consign = require("consign");
const db = require("./config/db");

app.db = db; //knex

const port = process.env.PORT || 3000;
consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

app.get("/", (req, res) => {
  res.send("<h1>Master working</h1>");
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
