const express = require("express");
const consign = require("consign");
const db = require("./config/db");
const morgan = require("morgan");
const AWS = require("aws-sdk");
const app = express();

const bucketName = "ecofinder-api-images-e28841c6-b9c1-4675-baa7-a0d2a11151a1";
AWS.config.getCredentials(function (err) {
	console.log("has credentials");
});

app.db = db; //knex

const port = process.env.PORT || 3333;
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});
