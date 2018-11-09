var express = require('express')
var router = express.Router();
var db = require("./db.js");

router.get('/app/users',function(req,res,next){
    let query = "Select * from users";
    let users = db.select(query);
    if(users){
       // res.status(200).json(JSON.parse(users));
        res.status(200).text("hallo fra get users");
    }
    
});

//------------------------------------------Legg til bruker-------------------------------------------
router.post('/app/users', async function(req,res,next){

    let email = req.body.email;
    let userName = req.body.userName;
    let password = req.body.password;
    let fullName = req.body.fullName;

    let query = `INSERT INTO public."users"("username", "email", "password", "full_name") 
        VALUES('${userName}', '${email}', '${password}', '${fullName}') RETURNING *`;

    let code = await db.insert(query) ? 200:500;
    res.status(code).json({}).end()
})

//----------------------------------------Logg inn på bruker-----------------------------------------
router.post('/login/', async function(req,res,next){

    let userName = req.body.userName;
    let password = req.body.password;
    
    let query = `SELECT * FROM public."users" WHERE username = '${userName}'`;
    console.log(query);
    
    try {
        let datarows = await db.any(query);
        console.log(datarows);
        let nameMatch = datarows.length == 1 ? true : false;
        if (nameMatch == true){
            let passwordMatch = (password, datarows[0].password);
            if (passwordMatch) {
                console.log(username)
                res.status(200).json({
                    mld: "Hello, " + username,
                    userName:userName
                });
            }
        } else {
            res.status(401).json({
                mld: "Feilbrukernavn eller passord"
            });
        }
    } catch (err){
        res.status(500).json({
            error: err
        });
    }

    let code = await db.insert(query) ? 200:500;
    res.status(code).json({}).end()
});





/*router.get('/app/users/:userName',function(req,res,next){

    let passwordHash = req.body.pswHash;
    let usersName = req.params["userName"];

    let query = `Select * from users where userName='${userName}' 
    and hash='${passwordHash}'`;


    if(users){
        res.status(200).json(users).end()
    } else{
        res.status(401).json({}).end();
    }
    
    let code = db.insert(query) ? 200:500;
    res.status(code).json({}).end();
})*/




module.exports = router;