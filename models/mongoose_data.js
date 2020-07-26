const Agency = require('./mongoose_models/Agency_model')
const Agent = require('./mongoose_models/Agent_model')
const User = require('./mongoose_models/User_model')
const bcrypt = require('bcryptjs')

// This function is retrieving the contact info from the DB
exports.getContactData = (agencyId, callBack) => {
    if (!agencyId)
        Agency.find({}, callBack);  // Get all agencies
    else
        Agent.find({ AgencyId: agencyId }, callBack);   // Get Agents for the given agencyId
}

// Creates a new user
exports.createUser = function (user, callBack) {
    //encrypt the passprd then store the encrypted passwod in the DB with the rest of the user info
    bcrypt.hash(user.password, 10, (err, hashedPassword) => {
        user.password = hashedPassword;  // replace the password with it's encrypted version
        const myuser = new User(user);  // User Mongoose Model
        myuser.save(function (err) {    // Saves the user to the DB
            //if (err) return console.error(err);
            callBack(err, 'Ok');
        })
    });
}

// Get the use using the userId (_id)
exports.getUser = function (userId, callBack) {
    User.findById(userId, (err, data) => {
        //console.log('In getUser')
        //console.log(err, data);
        callBack(err, data); // Send the results back
    });
}

// Checks the user credintials. 
// if username & password, returns the user object. Oherwise returns a message
exports.verifyLigin = function (username, password, callBack) {
    User.findOne({ username }, (err, user) => {
        if (err) return callBack(err);
        // If username not found
        if (!user) return callBack(null, false, { message: "Incorrect username" });
        //compare the given password with the store encyption
        bcrypt.compare(password, user.password, (err, res) => {
            if (err) return callBack(err);
            if (res) {
                // passwords match! log user in
                return callBack(null, user);
            } else {
                // passwords do not match!
                return callBack(null, false, { message: "Incorrect password" });
            }
        })
    });
}