const bcrypt = require("bcrypt-nodejs");
const { uuid } = require("uuidv4");

module.exports = (app) => {
  const {
    existsOrError,
    notExistsOrError,
    equalsOrError,
    minMaxLength,
  } = app.api.validation;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (req, res) => {
    // console.log(uuid());
    const user = { ...req.body };
    if (req.params.id) user.id = req.params.id;

    try {
      existsOrError(user.username, "Nome não informado");
      existsOrError(user.email, "E-mail não informado");
      minMaxLength(
        user.password,
        8,
        15,
        "Senha deve conter entre 8 e 15 caracteres, contando com Letras maiúsculas, minúsculas e caracteres especiais"
      );
      existsOrError(user.password, "Senha não informada");

      if (!user.id) {
        existsOrError(user.confirmPassword, "Confirmação de Senha inválida");
        equalsOrError(
          user.password,
          user.confirmPassword,
          "Senhas não conferem"
        );

        const userFromDB = await app
          .db("users")
          .where({ email: user.email })
          .first();
        notExistsOrError(userFromDB, "Usuário já cadastrado");
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }

    user.password = encryptPassword(user.password);

    delete user.confirmPassword;
    if (user.id) {
      user.update_at = new Date(Date.now());
      app
        .db("users")
        .update(user)
        .where({ id: user.id })
        // .whereNull("deletedAt")
        .then((_) => res.status(200).send("Usuário alterado com sucesso!"))
        .catch((err) => res.status(500).send(err));
    } else {
      user.create_at = new Date(Date.now());
      user.update_at = new Date(Date.now());
      user.id = uuid();
      app
        .db("users")
        .insert(user)
        .then((_) => res.status(200).send("Usuário Cadastrado com Sucesso!"))
        .catch((err) => res.status(500).send(err));
    }
  };

  const listAll = (req, res) => {
    app
      .db("users")
      .select("id", "username", "email")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err));
  };

  const listById = (req, res) => {
    app
      .db("users")
      // .select("id", "username", "email")
      .select("*")
      .where({ id: req.params.id })
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err));
  };

  return { save, listAll, listById };
};
