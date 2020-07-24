const mongoose = require('../mongoose_connect');
// Creating the User Schema
const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        trim: true
    },
    FirstName: String,
    LastName: String,
    Address: String
    // more fields defined below
});
// Creating the User collection Model
module.exports = mongoose.model('User', UserSchema);
