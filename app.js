var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var passport = require('./config/passport');

// var path = process.cwd();
require('dotenv').config();

var app = express();

// connect to mongoDB
mongoose.connect('mongodb://localhost/users');
mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/angular', express.static(process.cwd() + '/app/angular'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
// app.use(express.static(path.join(__dirname, 'public')));


// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
//uses persistent login sessions,
app.use(passport.session());
var path = process.cwd();

// Define routes.
app.get('/' ,homeAuthenticate, function(req, res) {
  res.sendFile(path + '/public/index.html');
});

app.get('/login',
  function(req, res){
    res.sendFile(path + '/public/login.html');
  });

app.get('/homeWithoutlogin',
  function(req, res){
    req.logout();
    res.sendFile(path + '/public/index_withoutlogin.html');
  });




app.route('/auth/github')
	.get(passport.authenticate('github'));

app.route('/auth/github/callback')
	.get(passport.authenticate('github', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));

app.get('/profile',
  // require('connect-ensure-login').ensureLoggedIn(),    In lieu of below function...
  homeAuthenticate,
  function(req, res){
    // res.json(req.user);
    res.render('profile', { user: req.user });
  });

app.route('/home')
	.get( homeAuthenticate, function (req, res) {
		res.sendFile(path + '/public/index.html');
	});

app.route('/newpoll')
	.get(homeAuthenticate, function (req, res) {
		res.sendFile(path + '/public/newpoll.html');
	});

app.route('/mypoll')
		.get(homeAuthenticate, function (req, res) {
			res.sendFile(path + '/public/mypoll.html');
		});

app.route('/:title')
		.get( function (req, res) {
			res.sendFile(path + '/public/poll-list.html');
		});

// initialize the routes
app.use('/api',api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err.message);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


function homeAuthenticate(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/homeWithoutlogin')
}
