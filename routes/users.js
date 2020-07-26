var express = require('express');
var router = express.Router();
const data = require('../models/mongoose_data')

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req.query.userId) // Get the user by Id
  if (!req.query.userId) return res.send(null); // Check if there is a value for the Id
  data.getUser(req.query.userId, (err, data) => {
    //console.log('In User Router')
    //console.log(err, data)
    res.send(data)  // Send back the results
  })
});

// Creates a new use 
router.post('/', (req, res, next) => {
  //console.log(JSON.stringify(req.body));
  data.createUser(req.body, (err, message) => {
    if (err) return res.status(500).send('Error ' + err);
    res.send("<h2 style='margin:50px;text-align: center;'>" +
      "Thank You for registering</h2>" +
      "<script> setTimeout(()=>window.location='/', 2000)</script>");
  });
});

module.exports = router;
