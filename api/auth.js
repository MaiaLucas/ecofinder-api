// const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

require("dotenv").config();

module.exports = (app) => {
  const login = async (req, res) => {
    if (!req.body.email || !req.body.password)
      return res.status(400).json({ message: "Favor informar email e senha!" });

    const password = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");
    const user = await app.db("users").where({ email: req.body.email }).first();

    console.log(user);
    if (!user)
      return res.status(400).json({ message: "Usuário não encontrado" });

    const payload = {
      email: req.body.username,
      type: "access",
    };

    const csrfPayload = {
      email: req.body.username,
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

    console.log("sucesso");
    const expTime = 2 * 24 * 60 * 60 * 1000;
    res.cookie("jwt", token, {
      magAge: expTime,
      httpOnly: true,
    });
    res.json({ token: csrf, user: user.id, expiresIn: expTime });

    // const isMatch = bcrypt.compareSync(req.body.password, user.password);

    // if (!isMatch)
    //   return res.status(401).json({ message: "Email/Senha inválidos" });

    // const now = Math.floor(Date.now() / 1000);

    // const payload = {
    //   id: user.id,
    //   username: user.username,
    //   email: user.email,
    //   iat: now,
    //   exp: now + 60 * 60 * 24,
    // };

    // res.json({
    //   ...payload,
    //   token: jwt.encode(payload, process.env.AUTH_SECRET),
    // });
  };

  function validate(req, res) {
    const csrf = req.get("CSRF");
    const str = req.cookies["jwt"];

    try {
      let jwtPayload = jwt.verify(str, process.env.AUTH_SECRET);
      let csrfPayload = jwt.verify(csrf, process.env.AUTH_SECRET);

      if (jwtPayload["type"] != "access")
        req.status(400).json({ message: "Invalid jwt payload" });
      if (jwtPayload["type"] != "csrf")
        req.status(400).json({ message: "Invalid anti-CSRF token payload" });

      res.status(201).send();
    } catch (e) {
      res.status(401).send();
    }
  }

  return { login, validate };
};
