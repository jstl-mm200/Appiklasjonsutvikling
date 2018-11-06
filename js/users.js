var express = require('express')
var router = express.Router();
var db = require("./db.js");

router.get('/app/users',function(req,res,next){
    let query = "Select * from Users";
    let users = db.select(query);
    if(users){
       // res.status(200).json(JSON.parse(users));
        res.status(200).text("hallo fra get users");
    }
    
});

router.post('/app/users', async function(req,res,next){

    let userEmail = req.body.email;
    let userName = req.body.name;
    let passwordHash = req.body.pswHash;


    let query = `INSERT INTO "Public"."Users"("email", "username", "hash") 
        VALUES('${userEmail}', '${userName}', '${passwordHash}') RETURNING *`;

    let code = await db.insert(query) ? 200:500;
    res.status(code).json({}).end()
})


router.get('/app/users/:userName',function(req,res,next){

    let passwordHash = req.body.pswHash;
    let usersName = req.params["userName"];

    let query = `Select * from Users where userName='${userName}' 
    and hash='${passwordHash}'`;


    if(users){
        res.status(200).json(users).end()
    } else{
        res.status(401).json({}).end();
    }
    
    let code = db.insert(query) ? 200:500;
    res.status(code).json({}).end();
})




module.exports = router;