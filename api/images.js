const { uuid } = require("uuidv4");

module.exports = (app) => {
	const save = async (req, res) => {
		const { id } = req.body;
		if (req.params.id) user.id = req.params.id;

		console.log(user);
		// try {
		// 	existsOrError(user.filename, "Nome não informado");

		// } catch (msg) {
		// 	return res.json({ status: 400, message: msg });
		// }

		// const newImage = {
		// 	originalname: user.originalname,
		// 	size: user.size,
		// 	filename: String(user.filename),
		// 	path: __dirname + "/tmp/uploads/" + user.filename,
		// };

		return;

		if (user.id) {
			user.update_at = new Date(Date.now());
			app
				.db("images")
				.update(user)
				.where({ id: user.id })
				// .whereNull("deletedAt")
				.then((_) => {
					res.status(200).json({ message: "Alterado com sucesso" });
				})
				.catch((err) => {
					res.status(500).json(err);
				});
		} else {
			// newImage.create_at = new Date(Date.now());
			// newImage.update_at = new Date(Date.now());
			// newImage.id = uuid();

			console.log(newImage);
			return;
			app
				.db("images")
				.insert(newImage)
				.then((_) =>
					res.status(200).json({ message: "Cadastrado com sucesso" })
				)
				.catch((err) => {
					console.log("object");
					res.status(500).json(err);
				});
		}
	};

	return { save };
};
