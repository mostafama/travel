var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// This function is retrieving the contact info from the DB
exports.getContactData = (agencyId, callBack) => {
    if (!agencyId)
        getData("agencies", [agencyId], callBack);
    else
        getData("agents", [agencyId], callBack);
}

function getData(collection, arguments, callBack) {
    // Connecting to the Mongo DB
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        // Specify the targe DB
        var dbo = db.db("travelexperts");
        // The select query
        dbo.collection(collection).find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            // Send the results back to the callback
            callBack(null, result);
            db.close();
        });
    });
}

//getContactData(1, () => { });