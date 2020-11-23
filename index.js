const express = require("express");
const consign = require("consign");
const db = require("./config/db");
const morgan = require('morgan');

const app = express();

app.db = db; //knex

const port = process.env.PORT || 3000;
consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app)

app.get("/", (req, res) => {
  res.send("<h1>Master working</h1>");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
