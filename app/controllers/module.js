const mongoose = require("mongoose");
const Module = mongoose.model("Module");

const createModule = async (req, res) => {
	const { moduleName, authorName, menuIcon } = req.body;

	const exists = await Module.exists({moduleName: moduleName});

	if (exists) {
		console.log('Module with that name already exists, please delete it and try again.');
		return res.send('Module with that name already exists, please delete it and try again.');
	} else {
		const moduleObject = new Module({ moduleName, authorName, menuIcon });
		moduleObject.save()
			.then(() => console.log('Module was created!'))
			.catch((err) => console.log(err));
	}
};

const getModules = async (req, res) => {
	res.send('Not implemented: getModules!');
};

const deleteModule = async (req, res) => {
	const { moduleName } = req.body;
};

exports.createModule = createModule;
exports.getModules = getModules;
