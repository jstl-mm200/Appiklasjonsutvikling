const express = require('express')
const router = express.Router();
const db = require("./db.js");
const bodyParser = require('body-parser');
const authorize = require("./auth.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SUPER_SECRET_KEY = process.env.TOKEN_KEY || "TransparantWindowsFlyingMonkeys";


//------------------------------------------Legg til bruker-------------------------------------------

router.post("/register/", async function(req,res,next){

    let email = req.body.email;
    let userName = req.body.userName;
    let password = req.body.password;
    let fullName = req.body.fullName;
    
    let userExists = await checkIfUserExists(userName);

    if (userExists === false) {
        let hashPassword = bcrypt.hashSync(password, 10);

    let query = `INSERT INTO public."users"("userName", "email", "password", "full_name") 
        VALUES('${userName}', '${email}', '${password}', '${fullName}') RETURNING *`;

    try {
            let statusCode = await db.any(query) ? 200 : 500;
            console.log("Status: " + statusCode);
            res.status(statusCode).json({
                msg: `Velkommen, ${userName}`
            }).end()

        } catch (error) {
            res.status(500).json({
                error: error
            }); //something went wrong!
            console.log("ERROR: " + error);
        }
    } else {
        res.status(409).json({
            msg: "Brukernavn allerede i bruk"
        });
    }
})

//----------------------------------------Logg inn på bruker-----------------------------------------

router.post("/login/", async function(req,res,next){

    let userName = req.body.userName;
    let password = req.body.password;
    
    let query = `SELECT * FROM public."users" WHERE userName = '${userName}' AND "activated"='true`;
    
    try {
        let datarows =  await db.select(query); 
        console.log(datarows);
        
        let nameMatch = datarows.length == 1 ? true : false;
        
        if (nameMatch == true){
            let passwordMatch = bcrypt.compareSync(password, datarows[0].hashpassword);
            
            if (passwordMatch) {
                let token = bcrypt.hashSync(datarows[0].id + secret, 10);
            
            res.status(200).json({
                    msg: "Hello, " + datarows[0].userName,
                    userName: datarows[0].userName,
                    id: datarows[0].id,
                    token: token
                });
            } else {
                res.status(401).json({
                    msg: "Feil brukernavn eller passord"
                });   
            } 
    } catch (err) {
        res.status(500).json({
        error = err
        });
                             
    }
}

    async function checkMailAndPassword(userName, password) {
    let query = `SELECT * FROM public."users" WHERE userName = '${userName}'`;

    try {
        let datarows = await db.any(query);
        let userName = datarows.length == 1 ? true : false;
        if (userName == true) {
            let passwordMatch = bcrypt.compareSync(password, datarows[0].hashpassword);
            if (passwordMatch) {
                res.status(200).json({
                    msg: "Hello, " + datarows[0].userName,
                    userName: datarows[0].userName
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

async function checkIfUserExists(email) {
    let query = `SELECT * FROM public."users" WHERE userName = '${userName}' AND "activated"='true'`;
    let datarows = await db.any(query);
    if (datarows.length > 0) {
        return true;
    } else {
        console.log("Bruker finnes ikke fra før. Registrering fortsetter");
        return false;
    }
}
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