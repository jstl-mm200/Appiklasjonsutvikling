/*var express = require('express')
var router = express.Router();
var db = require("./db.js");

let userNames = [];

function isNameInList(list,name){
    let searchName = name.toLowerCase();
    let result = false;
    for(let user in list){
		if(list[user].toLowerCase() === searchName){
            result = true;
            break;
		}
    }
	return result;
}


router.get('/app/requests', function(req,res, next){
    // Get all requests in the DB that have not ben responded to.
    let sqlQuery = "Select * from requests where answerd is NULL"
    let requests = db.select(sqlQuery);
    res.json(requests).end();
});

router.post('/app/request', function (req,res,next){

    ///TODO: Is the request unique?

    // Get the request details from the http request. (sent from the client)
    let userName = req.body.userName;
    let userID = req.body.userID;
    let description = req.body.description;

    // Build sql query for inserting request in DB.
    let sqlQuery = `INSERT INTO "public"."Users"("email", "username", "hash") 
        VALUES('${userEmail}', '${userName}', '${paswordHash}') RETURNING *`;
    
    let request = db.insert(sqlQuery);

    if(request){
        res.status(200).json(request).end();
    } else{
        res.status(500).json({}).end();
        
    }
});



module.exports = router;*/