/* Sends sidebar links to every request */
const mongoose = require('mongoose');
const Module = mongoose.model('Module');

//TODO: Include menuIcon so that modules can have custom icons in the sidebar
const sidebarLinks = async (req, res, next) => {
	const allModuleNames = await Module.find({}, 'moduleName').exec();
	res.locals.moduleNames = allModuleNames;
	next();
};

module.exports = sidebarLinks;