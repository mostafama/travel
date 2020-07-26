var express = require('express');
var router = express.Router();

/* Example of a page that require usr login first. */
router.get('/', function (req, res, next) {
  // if (req.isAuthenticated()) // You can use this to check if the user is loggied in
  res.render('private', { loginmsg: req.flash('error') });
  //else  // If the user is not loggedin, redirect to home page
  //  res.redirect('/')
});

module.exports = router;
