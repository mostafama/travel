var express = require('express');
var router = express.Router();
//const data = require('../models/mysql_data'); // MySQL
//const data = require('../models/mongo_data'); //MongoDB
const data = require('../models/mongoose_data'); //Mongoose

/* GET home page. */
router.get('/', function (req, res, next) {
  // Getting the agency information
  data.getContactData(null, (error, agencies) => {
    if (error) return res.status(500).send('Error ' + error);
    // Get agents information 
    data.getContactData(1, (error, agents) => {
      res.render('contactus',
        { agencies: agencies, agents: agents });
    })
  })
});

module.exports = router;
