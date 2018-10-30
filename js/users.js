var express = require('express')
var router = express.Router();
//var db = require("./db.js");

router.get('/app/users',function(req,res,next){
    let query = "Select * from Users";
    let users = db.select(query);
    if(users){
        res.status(200).json(JSON.parse(users));
    }
        
    
});

router.post('/app/users',function(req,res,next){

    let userEmail = req.body.email;
    let userName = req.body.name;
    let paswordHash = req.body.pswHash;


    let query = `INSERT INTO "public"."Users"("email", "username", "hash") 
        VALUES('${userEmail}', '${userName}', '${paswordHash}') RETURNING *`;

    let code = db.insert(query) ? 200:500;
    res.status(code).json({}).end()
})


router.get('/app/users',function(req,res,next){

    let paswordHash = req.body.pswHash;
    let usersName = req.params["userName"];

    let query = `Select * from Users where userName='${userName}' 
    and hash='${paswordHash}'`;


    if(users){
        res.status(200).json(users).end()
    } else{
        res.status(401).json({}).end();
    }
    
    let code = db.insert(query) ? 200:500;
    res.status(code).json({}).end();
})




module.exports = router;