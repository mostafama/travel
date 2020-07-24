var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var contactusRouter = require('./routes/contactus');
var usersRouter = require('./routes/users');

// Authentication
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const data = require('./models/mongoose_data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'),
  {
    extensions: ["html", "jpg"]
  }));

// Authentication
// Allows us to assign every user of the app a unique session, which allows us to store user state (are they logged in?)
// secret is used to sign the session ID cookie – should be a random unique string
app.use(session({
  secret: "myTravelWebsite secret",
  resave: false,
  saveUninitialized: true
}));

passport.use(
  new LocalStrategy((username, password, done) => {
    data.getUserName(username, (err, user) => {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { msg: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { msg: "Incorrect password" });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  data.getUser(id, function (err, user) {
    done(err, user);
  });
});
// initialize Passport
app.use(passport.initialize());
// initialize session
app.use(passport.session());
// Testing GIT 


//app.use('/', indexRouter);
app.use('/contactus', contactusRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
