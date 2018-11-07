const express = require("express");
const router = express.Router();
const db = require("./db.js"); 

router.get("/", async function(req, res){
    
   
    
    let data = await db.select("SELECT * FROM users");
    res.json(data.rows);
    
});

module.exports = router;