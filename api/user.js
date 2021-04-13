const bcrypt = require("bcrypt-nodejs");
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import * as nodemailer from "nodemailer";

module.exports = (app) => {
  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "13e0753d100d2d",
      pass: "6db8719c7fb9de",
    },
  });

  async function resetPassword(req, res) {
    const info = await transport.sendMail({
      from: "ecofinder@email.com",
      to: "pessoa@email.com",
      subject: "Recuperação de Senha",
      text: "Text",
      html: /*html*/ `<h1>html</h1>`,
    });
    return res.send("Mensagem enviada: %s", info.messageId);
  }

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  async function create(req, res) {
    const { email, password, confirm_password, full_name } = req.body;

    const data = {
      id: uuid(),
      email,
      password,
      confirm_password,
      full_name,
      create_at: new Date(),
      update_at: new Date(),
    };

    const schema = Yup.object().shape({
      email: Yup.string().email().required("Campo E-mail é obrigatório"),
      password: Yup.string().required("Campo Senha é obrigatório"),
      confirm_password: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Senhas não conferem"
      ),
      full_name: Yup.string(),
    });

    try {
      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ message: error });
    }

    delete data.confirm_password;
    data.password = encryptPassword(data.password);
    app
      .db("users")
      .insert(data)
      .then((_) => res.status(204).send())
      .catch((err) =>
        res.status(500).send({ message: "Internal Server Error" })
      );
  }

  async function edit(req, res) {
    if (!req.params.id) res.status(500).send();
    const { email, full_name } = req.body;

    const requestImage = req.files;

    const data = {
      email,
      full_name,
      create_at: new Date(),
      update_at: new Date(),
      avatar: requestImage[0]["location"],
    };

    const schema = Yup.object().shape({
      email: Yup.string().email(),
      full_name: Yup.string(),
    });

    try {
      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ message: error });
    }

    delete data.confirm_password;
    app
      .db("users")
      .update(data)
      .where({ id: req.params.id })
      .then((_) => res.status(204).send())
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
      });

    console.log(data);
  }

  function list(req, res) {
    app
      .db("users")
      // .select("id", "full_name", "email", "avatar")
      .select("*")
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
      });
  }

  function findUser(req, res) {
    app
      .db("users")
      // .select("*")
      .select("full_name", "avatar", "email")
      .where({ id: req.params.id })
      .then((users) => res.json(...users))
      .catch((err) =>
        res.status(500).send({ message: "Internal Server Error" })
      );
  }

  return { list, create, edit, findUser, resetPassword };
};
