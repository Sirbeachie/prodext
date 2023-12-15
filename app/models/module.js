const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
	_moduleId: Schema.Types.ObjectId,
	moduleName: String,
	authorName: String,
	menuIcon: String
});

const Module = mongoose.model('Module', ModuleSchema);

module.exports = Module;