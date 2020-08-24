const bodyParser = require("body-parser"); //interpreta o body da requisição
const cors = require("cors"); //permitir que possa que outra aplicação possa ter acesso acesso

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cors());
};
