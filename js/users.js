const express = require('express')
const router = express.Router();
const db = require("./db.js"); 
const bodyParser = require('body-parser');
const authorize = require("./auth.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SUPER_SECRET_KEY = process.env.TOKEN_KEY || "TransparantWindowsFlyingMonkeys";

/*------------------------------------------ Legg til bruker -----------------------------------------*/

router.post('/app/createUser', async function(req,res,next){

    let email = req.body.email;
    let userName = req.body.userName;
    let password = req.body.password;
    let fullName = req.body.fullName;
    
    //let userExists = await checkIfUserExists(userName);

    if (true) {
        let hashPassword = bcrypt.hashSync(password, 10);
        let query = `INSERT INTO public."users"("username", "email", "password", "full_name") VALUES('${userName}', '${email}', '${hashPassword}', '${fullName}') RETURNING *`;
        
        console.log(query);

        try {
            
            let result = await db.insert(query);
            console.log(result);
            res.status(200).json({
                msg: `Velkommen, ${userName}`,
                data: result.rows
            }).end();
    
        } catch (error) {
            res.status(500).json({
                error: error
            }); //something went wrong!
            console.log("ERROR: " + error);
        }
    } 
    else {
        res.status(409).json({
            msg: "Brukernavn allerede i bruk"
        });
    }
})

/*---------------------------------------- Logg inn med bruker -----------------------------------------*/

router.post("/app/login", async function(req,res,next){

    let userName = req.body.userName;
    let password = req.body.password;
    
    let query = `SELECT * FROM users WHERE userName = '${userName}'`;
    // AND "activated"='true
    
    //console.log(query);
    //console.dir(req.body);
    
    try {
        let datarows =  await db.select(query); 
       // console.log("rad fra database: ", datarows);
             
        if (datarows.rows.length > 0){
            
            let user = datarows.rows[0];
            //console.log(user.password);
            let passwordMatch = bcrypt.compareSync(password, user.password);
            
            console.log(passwordMatch);
            
            if (passwordMatch) {
                
                let token = jwt.sign({
                    id: user.user_id,
                    userName: user.userName
                }, SUPER_SECRET_KEY);
            
                res.status(200).json({
                    msg: "Hello, " + user.username,
                    userName: user.userName,
                    id: user.id,
                    token: token
                });
            } else {
                res.status(401).json({
                    msg: "Feil brukernavn eller passord"
                });   
            } 
        } else
            {
                res.status(401).json({
                    msg: "Feil brukernavn eller passord"
                }); 
            }
    }catch (err) {
            res.status(500).json({error : err});
    }
});


async function checkNameAndPassword(userName, password) {
    let query = `SELECT * FROM public."users" WHERE userName = '${userName}'`;
    let user = datarows[0];
    
    try {
        let datarows = await db.any(query);
        let userName = datarows.length == 1 ? true : false;
        if (userName == true) {
            let passwordMatch = bcrypt.compareSync(password, user.password);
            if (passwordMatch) {
                res.status(200).json({
                    msg: "Hello, " + user.userName,
                    userName: user.userName
                });
            } else {
                res.status(401).json({
                    msg: "Feil brukernavn eller passord"
                });
            }
        } else {
            res.status(401).json({
                msg: "Feil brukernavn eller passord"
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err
        }); //something went wrong!
    }
}

/*async function checkIfUserExists(email) {
    let query = `SELECT * FROM public."users" WHERE userName = '${userName}' AND "activated"='true'`;
    let datarows = await db.any(query);
    if (datarows.length > 0) {
        return true;
    } else {
        console.log("Bruker finnes ikke fra før. Registrering fortsetter");
        return false;
    }
} */

module.exports = router;
/* if(isAuthenticated){
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
        } */