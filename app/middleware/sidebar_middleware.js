/* Sends sidebar links to every request */
const mongoose = require('mongoose');
const Module = mongoose.model('Module');

const sidebarLinks = (req, res, next) => {
	const allModuleNames = Module.find({}, 'moduleName').exec();
	res.locals.moduleNames = allModuleNames;
	next();
};

module.exports = sidebarLinks;