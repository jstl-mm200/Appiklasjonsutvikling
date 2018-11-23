const express = require('express')
const router = express.Router();
const db = require("./db.js");
const bodyParser = require('body-parser');
const authorize = require("./auth.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/app/showCreate', authorize, async function(req,res,next){
    
    var fileText = global.appRoot + "\\public\\create-show-list.html";
    console.log(Object.keys(req.body));
    
    res.sendFile(fileText);
});

router.post('/app/list',authorize, async function(req,res,next){
    
    // Legge til en ny liste i db.
    let listName = req.body.listName;
    let listCont = req.body.listCont;
  
    let query = `INSERT INTO public."lists"("list_name", "list_element") VALUES('${listName }', '${listCont}') RETURNING *`;

    console.log("query " + query);

    try {
        let result = await db.insert(query);
        console.log(result);
        res.status(200).json({
            msg: "Hello, " + result.listName + " id "+ result.list_id,
            listId: result.list_id,
            //listArray: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            error: error
        }); //something went wrong!
        console.log("ERROR: " + error);
    }
    res.status(200).send("YESSS");  
});

router.get("/app/list/",authorize, async function(req,res,next){
    // hente og se alle lister
  
    let query = `SELECT * FROM "all_lists"`;
    
    try {
        let result = await db.select(query);
        res.status(200).json(result.rows);
    
    }catch (err) {
            res.status(500).json({error : err});
    }   
});

router.post("/app/list/:listID",authorize, async function(req,res,next){
    
}); // gå inn på en spesifik liste

router.get("/app/list/:listeID",authorize, async function(req,res,next){
    
    // hente og se en liste 
    
    res.status(200).send("YESSS");
    
});

module.exports = router;