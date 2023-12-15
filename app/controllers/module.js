const mongoose = require("mongoose");
const Module = mongoose.model("Module");

const createModule = async (req, res) => {
	const { moduleName, authorName, menuIcon } = req.body;

	const moduleObject = new Module({ moduleName, authorName, menuIcon });
	moduleObject.save()
		.then(() => console.log('Module was created!'))
		.catch((err) => console.log(err));
};

const deleteModule = async (req, res) => {
	const { moduleName } = req.body;
};

exports.createModule = createModule;
