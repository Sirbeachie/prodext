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

var indexRouter = require('./routes/index');
var moduleRouter = require('./routes/module');

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
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*async function main() {
  await 
}
main().catch(console.dir);*/
module.exports = app;

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Server started on port: ${server.address().port}`);
});