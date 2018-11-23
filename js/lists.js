const express = require('express')
const router = express.Router();
const db = require("./db.js");
const bodyParser = require('body-parser');
const authorize = require("./auth.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/app/list',authorize, async function(req,res,next){
    
    // Legge til en ny liste i db.
    let listName = req.body.listName;
    let listCont = req.body.listCont;
  
    let query = `INSERT INTO public."lists"("list_name", "list_element", "") VALUES('${listName }', '${listCont}') RETURNING *`;

    console.log("query " + query);

    try {
        let result = await db.insert(query);
        console.log(result);
        res.status(200).json({
            msg: "Hello, " + result.listName +" id "+ result.list_id,
            //listId: result.list_id
            //let listArray = result.rows[0];
            //listId: listArray.list_id
        });

    } catch (error) {
        res.status(500).json({
            error: error
        }); //something went wrong!
        console.log("ERROR: " + error);
    }
    res.status(200).send("YESSS");  
});

router.get("/app/list/",authorize, function(req,res,next){
    // hente og se alle lister
  
    let query = `SELECT * FROM lists WHERE list_name`;
    
    try {
        await db.select(query);
        
    }catch (err) {
            res.status(500).json({error : err});
    }   
    
    res.status(200).send("YESSS");
    
});

router.post("/app/list/:listID",authorize,function(req,res,next){
    
}); // gå inn på en spesifik liste

router.get("/app/list/:listeID",authorize, function(req,res,next){
    
    // hente og se en liste 
    
    res.status(200).send("YESSS");
    
});

module.exports = router;