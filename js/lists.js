const express = require('express')
const router = express.Router();
const db = require("./db.js");
const bodyParser = require('body-parser');
const authorize = require("./auth.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//åpner loginside med riktig re-routing
router.post('/app/showCreate', authorize, async function(req,res,next){
    
    var fileText = global.appRoot + "\\Public\\create-show-list.html";
    console.log(Object.keys(req.body));
    
    res.sendFile(fileText);
});

//lager ny liste + navn 
router.post('/app/list',authorize, async function(req,res,next){
    
    // Legge til en ny liste i db.
    let listName = req.body.listName;
    let userId = req.body.userId;
    let whatToDo = req.body.whatToDo
    
    if(whatToDo === "new list"){
        let query = `INSERT INTO public."all_lists"("user_id", "list_name") VALUES('${userId}','${listName }') RETURNING *`;

        console.log("query " + query);

        try {
            let result = await db.insert(query);
            if(result.rows.length>0){
                res.status(200).json({
                    msg: "Hello, " + result.rows[0].listName + " id "+ result.rows[0].list_id,
                    listId: result.rows[0].list_id
                }).end();
            }else{
                res.status(500).json({
                    error: "Kunne ikke legget til list i all_list"
                });
            }

        } catch (error) {
            res.status(500).json({
                error: error
            }); //something went wrong!
            console.log("ERROR: " + error);
        }
    }else if(whatToDo === "delete list"){
        //TODO: slette liste fra database
    }

    //res.status(200).send("YESSS");  
});
 
//legger til posts i liste
router.post('/app/post',authorize, async function(req,res,next){
    
    let listPost = req.body.listPost;
    let listId = req.body.listId;
    let whatToDo = req.body.whatToDo;
    if(whatToDo === "new post"){
        let query = `INSERT INTO public."all_posts"("post", "list_id") VALUES('${listPost}','${listId}') RETURNING *`;

        console.log("query " + query);

        try {
            let result = await db.insert(query);
            if(result.rows.length>0){
                res.status(200).json({
                    msg: "Hello, " + result.rows[0].post + " id "+ result.rows[0].post_id,
                    postId: result.rows[0].post_id
                }).end();
            }else{
                res.status(500).json({
                    error: "Kunne ikke legget til post i all_post"
                });
            }            
            console.log(result);
        } catch (error) {
            res.status(500).json({
                error: error
            }); //something went wrong!
            console.log("ERROR: " + error);
        }
   }
  
});

// hente og se alle liste-navn
router.get("/app/list",authorize, async function(req,res,next){
  
    let query = `SELECT * FROM "all_lists"`;
    
    try {
        let result = await db.select(query);
        res.status(200).json(result.rows);
    
    }catch (err) {
            res.status(500).json({error : err});
    }   
});

// hente ut alle posts
router.get("/app/post",authorize, async function(req,res,next){

    let query = `SELECT * FROM "all_posts"`;
    
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