var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');

require('./configs/db.config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const convisRouter = require('./routes/convis');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/convis', convisRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);

  const data = {}

  if(err instanceof mongoose.Error.ValidationError){
    res.status(400);
    for(field of Object.keys(err.errors)) {
      err.errors[field] = err.errors[field].message
    }
    data.errors = err.errors
  } else if (err instanceof mongoose.Error.CastError) {
    error = createError(404, 'Resource not found')
  }
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  data.message = err.message;
  res.json(data)
});

module.exports = app;
