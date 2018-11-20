const express = require('express')
const router = express.Router();
const db = require("./js/db.js");
const bodyParser = require('body-parser');
const authorize = require("./js/auth.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post("/app/list",authorize, function(req,res,next){
    
    // Legge til en ny liste i db.
    
    res.status(200).send("YESSS");
    
});

router.post("/app/list/:listID",authorize,function(req,res,next){
    
}); // gå inn på en spesifik liste

router.get("/app/list/:listeID",authorize, function(req,res,next){
    
    // hente og se en liste
    
    res.status(200).send("YESSS");
    
});

module.exports = router;