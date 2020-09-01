require("dotenv").config();
const passport = require("passport");
const passportJwt = require("passport-jwt");
const { Strategy, ExtractJwt } = passportJwt;

module.exports = (app) => {
  // const params = {
  //   secretOrKey: process.env.AUTH_SECRET,
  //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // };

  // const strategy = new Strategy(params, (payload, done) => {
  //   app
  //     .db("users")
  //     .where({ id: payload.id })
  //     .first()
  //     .then((user) => {
  //       console.log("entrou");
  //       done(null, user ? { ...payload } : false);
  //     })
  //     .catch((err) => done(err, false));
  // });

  // passport.use(strategy);

  const authenticate = (req, res) => {
    console.log(req);
    // app
    //   .db("users")
    //   .select("id", "username", "email")
    //   .then((users) => res.json(users))
    //   .catch((err) => res.status(500).send(err));
  };

  // const authenticate = (req, res, next) => {
  //   console.log(req);
  //   const token = req.headers["x-access-token"];
  //   if (!token)
  //     return res
  //       .status(401)
  //       .json({ auth: false, message: "No token provided." });

  //   jwt.verify(token, process.env.AUTH_SECRET, function (err, decoded) {
  //     if (err)
  //       return res
  //         .status(500)
  //         .json({ auth: false, message: "Failed to authenticate token." });

  //     // se tudo estiver ok, salva no request para uso posterior
  //     req.userId = decoded.id;
  //     next();
  //   });
  // };

  return {
    authenticate,
    // authenticate: () =>
    //   passport.authenticate("jwt", { session: false }, function (req, res) {
    //     res.send("Foi");
    //   }),
  };
};
