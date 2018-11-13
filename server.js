const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const db = require("./js/db.js"); 
//const authorize = require("./authorize.js");
const users = require("./js/users.js"); 
//const que = require("./js/requestQue.js") 

app.set('port', (process.env.PORT || 3000));
app.use(express.static('Public'));
app.use(bodyParser.json());
app.use(users);
//app.use(que);





app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Oops thats bad');
});

app.listen(app.get('port'), function() {
    console.log('Test', app.get('port'));
});


/*Jostein verson 
const express = require("express");
const app = express();
//const pgp = require("pg-promise")();
const db = require("./js/db.js"); 

//let db = pgp("jdbc:postgresql://ec2-46-137-75-170.eu-west-1.compute.amazonaws.com:5432/d2tjh4c7fbuo91");

app.use( async function(req, res, next) {  
    
    //kode som kjøres før endepunktene
    next();
    
});

const users = require("./js/users2.js"); 
app.use("/app/users/", users);


app.listen(3000, function(){
    console.log("server is running");
});*/