/* Sends sidebar links to every request */
const mongoose = require('mongoose');
const Module = mongoose.model('Module');

const sidebarLinks = async (req, res, next) => {
	const allModuleNames = await Module.find({}, 'moduleName').exec();
	res.locals.moduleNames = allModuleNames;
	next();
};

module.exports = sidebarLinks;