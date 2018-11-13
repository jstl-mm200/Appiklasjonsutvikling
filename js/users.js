const express = require('express')
const router = express.Router();
const db = require("./db.js");
const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt.js');

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
    //let hashPassw = bcrypt.hashSync(password, 10);

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
    
    let isAuthenticated = false;
    let error = null;
    let user = null;
    
    try {
        
        let datarows =  await db.select(query); 
        console.log(datarows);
        let nameMatch = datarows.length == 1;
        if (nameMatch == true){
            if (password === datarows[0].password){ // Lur plass å bruke bcrypt            
                console.log(username)
                isAuthenticated = true;
                user = datarows[0];
            }
        } 
    } catch (err){
        error = err
    }

    
    if(isAuthenticated){
    res.status(200).json({
                    mld: "Hello, " + username,
                    userName:userName,
                    id:user.id,
                    //token:
                });
        }else if(error === null){
            res.status(404).json({
                    mld: "Ikke autensiert, feil brukernanv og passord etc..."
                });
        }else{
           res.status(500).json({
                    mld: "Oops vi har en feil"
                    //error = err
                }); 
        }
   
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