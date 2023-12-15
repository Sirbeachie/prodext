const express = require('express');
const router = express.Router();

const {
	getModules,
	getModuleByName,
	getModuleById,
	createModule,
	updateModule,
	deleteModule
} = require('../controllers/module.js');

/*router.get('/module/', getModules);
router.get('/module/:moduleName', getModuleByName);
router.get('/module/:_moduleId', getModuleById);*/
router.post('/module/', createModule);
/*router.put('/module/:moduleName', updateModule);
router.delete('/module/:moduleName', deleteModule);*/

module.exports = router;