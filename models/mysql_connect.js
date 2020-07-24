// Create the DB connection
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "u1",
    password: "u1",
    database: "travelexperts"
});

module.exports = con;