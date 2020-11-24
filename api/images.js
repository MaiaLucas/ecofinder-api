const { uuid } = require("uuidv4");

module.exports = (app) => {
  const save = async (req, res) => {
    const user = { ...req.file };
    console.log(user.filename);
		if (req.params.id) user.id = req.params.id;

		// try {
		// 	existsOrError(user.filename, "Nome não informado");
			
		// } catch (msg) {
		// 	return res.json({ status: 400, message: msg });
    // }
    
    const image_uploaded = {
      originalname: user.originalname,
      size: user.size,
      filename: user.filename,
      path: __dirname + "/tmp/uploads/" + user.filename
    }
		
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
			image_uploaded.create_at = new Date(Date.now());
			image_uploaded.update_at = new Date(Date.now());
			image_uploaded.id = uuid();
			app
				.db("users")
				.insert(image_uploaded)
				.then((_) =>
					res.status(200).json({ message: "Cadastrado com sucesso" })
				)
				.catch((err) => res.status(500).json(err));
		}
	};

  return { save };
};