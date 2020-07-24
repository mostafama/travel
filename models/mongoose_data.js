const Agency = require('./mongoose_models/Agency_model')
const Agent = require('./mongoose_models/Agent_model')
const User = require('./mongoose_models/User_model')
// This function is retrieving the contact info from the DB
exports.getContactData = (agencyId, callBack) => {
    if (!agencyId)
        Agency.find({}, callBack);  // Get all agencies
    else
        Agent.find({ AgencyId: agencyId }, callBack);   // Get Agents for the given agencyId
}

// Creates a new user
exports.createUser = function (user, callBack) {
    const myuser = new User(user);  // User Mongoose Model
    myuser.save(function (err) {    // Saves the user to the DB
        //if (err) return console.error(err);
        callBack(err, 'Ok');
    })
}

// Get the use using the userId
exports.getUser = function (userId, callBack) {
    User.findById(userId, (err, data) => {
        //console.log('In getUser')
        //console.log(err, data);
        callBack(err, data); // Send the results back
    });
}

// Get the use using the userId
exports.getUserName = function (Username, callBack) {
    User.findOne({ Username }, (err, data) => {
        //console.log('In getUser')
        //console.log(err, data);
        callBack(err, data); // Send the results back
    });
}