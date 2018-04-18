var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promotionRouter');
var leaderRouter = require('./routes/leaderRouter');

var session = require('express-session');
var FileStore = require('session-file-store')(session);

//this is for mongoose connection
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db)=>{
	console.log("connected correctly to server");
},(err)=>{console.log(err);});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// app.use(cookieParser('12345'));

// function auth(req,res,next){
//   //if(!req.signedCookies.user)
  
//   // if no cookie
//   if(!req.signedCookies.user){
//     var authHeader = req.headers.authorization;
//     console.log(authHeader);
//     //if there is no authentication
//     if(!authHeader){
//       var err = new Error("no creds!");
//       res.setHeader('WWW-Authenticate','Basic');
//       return next(err);
//     }

//     var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
//     var user = auth[0];
//     var pass = auth[1];
//     if(user == 'admin' && pass == 'password'){
//       res.cookie('user','admin');
//       res.setHeader('WWW-Authenticate','Basic');
//       return next();
//     }
//     var err = new Error("wrong creds!");
//     res.setHeader('WWW-Authenticate','Basic');
//     return next(err);
//   }
//   // else there is cookie
//   else {
//     if(req.signedCookies.user == 'admin'){
//       next();
//     }
//     var err = new Error("invalid cookie!");
//     res.setHeader('WWW-Authenticate','Basic');
//     return next(err);
//   }
// }



app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

function auth(req,res,next){
  //if(!req.signedCookies.user)
  console.log(req.session);

  // if no cookie
  if(!req.session.user){
    var authHeader = req.headers.authorization;
    console.log(authHeader);
    //if there is no authentication
    if(!authHeader){
      var err = new Error("no creds!");
      res.setHeader('WWW-Authenticate','Basic');
      return next(err);
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if(user === 'admin' && pass === 'password'){
      req.session.user = 'admin';
      res.setHeader('WWW-Authenticate','Basic');
      return next();
    }
    var err = new Error("wrong creds!");
    res.setHeader('WWW-Authenticate','Basic');
    return next(err);
  }
  // else there is cookie
  else {
    if(req.session.user === 'admin'){
      return next();
    }
    var err = new Error("invalid session!");
    res.setHeader('WWW-Authenticate','Basic');
    return next(err);
  }
}


app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

function auth(req,res,next){
  //if(!req.signedCookies.user)
  console.log(req.session);

  // if no cookie
  if(!req.session.user){
    var authHeader = req.headers.authorization;
    console.log(authHeader);
    //if there is no authentication
    if(!authHeader){
      var err = new Error("no creds!");
      res.setHeader('WWW-Authenticate','Basic');
      return next(err);
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if(user === 'admin' && pass === 'password'){
      res.session.user = 'admin';
      res.setHeader('WWW-Authenticate','Basic');
      return next();
    }
    var err = new Error("wrong creds!");
    res.setHeader('WWW-Authenticate','Basic');
    return next(err);
  }
  // else there is cookie
  else {
    if(req.session.user === 'admin'){
      next();
    }
    var err = new Error("invalid session!");
    res.setHeader('WWW-Authenticate','Basic');
    return next(err);
  }
}



app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/dishes/',dishRouter);
app.use('/promotion/', promoRouter);
app.use('/leader/',leaderRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
