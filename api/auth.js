const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");
require("dotenv").config();

module.exports = (app) => {
	const signin = async (req, res) => {
		if (!req.body.email || !req.body.password)
			return res
				.status(400)
				.json({ code: 400, message: "Favor informar email e senha!" });

		const user = await app.db("users").where({ email: req.body.email }).first();

		if (!user)
			return res
				.status(400)
				.json({ code: 400, message: "Usuário não encontrado" });

		const isMatch = bcrypt.compareSync(req.body.password, user.password);

		if (!isMatch)
			return res
				.status(401)
				.json({ code: 401, message: "Email/Senha inválidos" });

		const now = Math.floor(Date.now() / 1000);

		const payload = {
			id: user.id,
			username: user.username,
			email: user.email,
			iat: now,
			exp: now + 60 * 60 * 24,
		};

		res.json({
			...payload,
			token: jwt.encode(payload, process.env.AUTH_SECRET),
		});
	};

	const validateToken = async (req, res) => {
		const userData = req.body || null;
		console.log(userData);
		try {
			if (userData) {
				const token = jwt.decode(userData.token, process.env.AUTH_SECRET);
				return res.send(new Date(token.exp * 1000) > new Date());
			}
		} catch (e) {
			//problema com o token
			return res.status(400).send(false);
		}
	};

	return { signin, validateToken };
};
