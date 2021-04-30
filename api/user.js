const bcrypt = require("bcrypt-nodejs");
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import * as nodemailer from "nodemailer";
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = (app) => {
  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "13e0753d100d2d",
      pass: "6db8719c7fb9de",
    },
  });

  const header = `
<header>
  <!-- CSS only -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
  <!-- JavaScript Bundle with Popper -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
</header>
  `;

  async function validadePassword(req, res) {
    const { password, confirm_password } = req.query;
    const { id } = req.params;

    if (!id)
      return res.send(
        `
        <div class="container m-4">
          <h1>Não foi possível acessar essa página! Em caso de duvidas entre em contato com nossa equipe de suporte</h1>
        </div>
        `
      );
    const data = { password, confirm_password };

    const schema = Yup.object().shape({
      password: Yup.string().required("Campo Senha é obrigatório"),
      confirm_password: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Senhas não conferem"
      ),
    });

    try {
      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      const { errors } = error;
      // return res.send(errors[0]);

      return res.send(
        `
        ${header}

        <div 
        style="height: 100vh"
        class="d-flex justify-content-center align-items-center"
      >
        <div class="col-sm-4 text-center">
          <div class="alert alert-danger" role="alert">
            ${errors[0]}
          </div>
        </div>
      </div>
        `
      );
    }

    delete data.confirm_password;
    data.password = encryptPassword(data.password);
    data.update_at = new Date();
    app
      .db("users")
      .update(data)
      .then((_) => res.send("<h2>Senha alterada com sucesso!</h2>"))
      .catch((err) => {
        console.log(err);

        return res.send("erro");
      });

    // return res.send("validado");
    return res.send(
      `
      ${header}
      <div 
        style="width: 100%; height: 100vh"
        class="d-flex justify-content-center align-items-center"
      >
        <div class="col-sm text-center">
          <h1 style="color: blue">Senha Alterada com sucesso!</h1>
          <p class="text-muted">Pode voltar pro aplicativo agora! </p>
        </div>
      </div>
      `
    );
  }

  async function resetPassword(req, res) {
    const { token, id } = req.params;

    if (!token)
      return res.send(`<h1>Não foi possível acessar essa página</h1>`);

    try {
      const jwtPayload = await jwt.verify(token, process.env.AUTH_SECRET);

      if (jwtPayload.type !== "access" || jwtPayload.exp >= Date.now())
        return res.send("Token Invalido");
    } catch (error) {
      return res.send("Algo deu errado! Tente novamente");
    }

    const form = `
    <h2>Recuperação de senha</h2>
    <form action="/validate_password/${id}" validate>
      <div class="mb-3">
        <label for="password" class="form-label">Senha:</label>
        <input 
          type="password" 
          id="password" 
          name="password"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="confirm_password" class="form-label">Confirmar Senha:</label>
        <input 
          type="password" 
          id="confirm_password" 
          name="confirm_password"
          class="form-control"
          required
        />
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary">Recuperar a Senha</button>
      </div>
    </form> `;

    return res.send(`
<html>
${header}
<body>
  <div class="container my-4">
    <div class="row">
      <div class="col-sm">
      </div>
      <div class="col-sm">
        ${form}
      </div>
      <div class="col-sm">
      </div>
    </div>
  </div>
</body>
</html>`);
  }

  async function recover(req, res) {
    const { email } = req.query;

    if (!email)
      return res.status(422).json({ error: "E-mail não encontrado!" });

    const findEmail = await app
      .db("users")
      .select("id")
      .where({ email: email })
      .from("users")
      .limit(1);

    if (!findEmail)
      return res.status(422).json({ error: "Usuário não encontrado" });

    const payload = {
      email: email,
      type: "access",
    };

    const token = jwt.sign(payload, process.env.AUTH_SECRET, {
      algorithm: "HS256",
      expiresIn: "30 minutes",
    });

    const expTime = 30 * 60 * 1000;

    res.cookie("jwt", token, { magAge: expTime, httpOnly: true });

    // await transport.sendMail({
    //   to: email,
    //   from: "suporte@ecofinder.com.br",
    //   subject: "Recuperação de Senha",
    //   text: "Recuperação de senha",
    //   html: /*html*/ `
    //   <h6>Vamos Recuperar sua senha!</h6>
    //   <a href="http://localhost:4040/reset_password/${token}/${findEmail[0].id}">Clique aqui</a>
    //   `,
    // });
    return res.status(200).json({ message: "E-mail enviado com sucesso!" });
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

    const user = await app.db("users").where({ email: email }).first();

    if (user)
      return res
        .status(422)
        .json({ error: "Já existe um usuário com esse e-mail" });

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
      return res.status(400).json({ error: error.errors });
    }

    delete data.confirm_password;
    data.password = encryptPassword(data.password);
    app
      .db("users")
      .insert(data)
      .then((user) => {
        const payload = {
          email: email,
          type: "access",
        };

        const csrfPayload = {
          email: email,
          type: "csrf",
        };

        const token = jwt.sign(payload, process.env.AUTH_SECRET, {
          algorithm: "HS256",
          expiresIn: "2 days",
        });
        const csrf = jwt.sign(csrfPayload, process.env.AUTH_SECRET, {
          algorithm: "HS256",
          expiresIn: "2 days",
        });

        const expTime = 2 * 24 * 60 * 60 * 1000;
        res.cookie("jwt", token, {
          magAge: expTime,
          httpOnly: true,
        });
        return res.json({ token: csrf, user: data.id, expiresIn: expTime });
      })
      .catch((err) => {
        console.log("err", err);
        res.status(500).json({ message: "Internal Server Error" });
      });
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

  return {
    list,
    create,
    edit,
    findUser,
    recover,
    resetPassword,
    validadePassword,
  };
};
