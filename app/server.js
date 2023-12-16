var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const uri = "mongodb://localhost:27017/Prodext";
mongoose.connect(uri);
const Module = require('./models/module');

var router = require('./routes/routes');

var app = express();

const sidebarLinks = require('./middleware/sidebar_middleware.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', sidebarLinks);
app.use('/', router);

module.exports = app;

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Server started on port: ${server.address().port}`);
});