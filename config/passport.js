require("dotenv").config();
const passport = require("passport");
const passportJwt = require("passport-jwt");
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

module.exports = (app) => {
  const params = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secretOrKey',
  };

  const strategy = new JwtStrategy(params, (payload, done) => {
    app
      .db("users")
      .where({ id: payload.id })
      .first()
      .then((user) => {
        done(null, user ? { ...payload } : false);
      })
      .catch((err) => done(err, false));
  });
  passport.use(strategy);

  passport.authenticate("jwt", { session: false });

  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      return passport.authenticate("jwt", { session: false });
    },
  };
};
