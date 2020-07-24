const conection = require('./mysql_connect');
// This function is retrieving the contact info from the DB
exports.getContactData = (agencyId, callBack) => {
    let select = "";
    if (!agencyId) select = "SELECT * FROM travelexperts.agencies;"
    else select = "SELECT * FROM agents WHERE agencyId= ?;";
    // Build the select statement
    getData(select, [agencyId], callBack);
}



function getData(select, arguments, callBack) {
    conection.query(select, arguments, function (err, result, fields) {
        if (err) {
            return callBack(err);
        };
        console.log(result);
        if (result.length)
            callBack(null, result);
        else
            callBack(null, null);
    });
}

//getContactData(1, () => { });