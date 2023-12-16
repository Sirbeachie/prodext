var express = require('express');
var router = express.Router();

const {
  getModules,
  getModuleByName,
  getModuleById,
  createModule,
  updateModule,
  deleteModule
} = require('../controllers/module.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dashboard' });
});

router.post('/module', createModule);
router.get('/module/', (req, res, next) => {
  res.send('Not implemented yet!');
});

module.exports = router;