const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = ('port', (process.env.PORT || 8080));
const db = require("/js/db.js");



app.set('port', port);
app.use(express.static('Public'));
app.use(bodyParser.json());
app.listen(app.get('port'), function() {
    console.log('Event server running', app.get('port'));
    
});



const users = [];

let userEmail = req.body.email;
let userName = req.body.name;
let passwordHash = req.body.pswHash;
let userRole = req.body.role;

app.post('/app/users',function(req,res,next){
    let query`INSERT INTO "public"."Users"("email", "username", "hash", "role")
    VALUES('${userEmail}', '${userName}', '${passwordHash}', ${userRole}) RETURNING "id", "email", "hash", "role"`
    
    let code = db.insert(query) ? 200:500;
    res.status(code).json({}).end();
})

app.get('/app/user',function(req,res,next){
    
    let query = "Select * from Users";
    let users = db.select(query;)
        
    if(users){
       res.status(200).json(JSON.parse(users));
    }else{
        //???
                            }
});

app.post("/api/user",function(req,res){
    
    let user = req.body;
    user.id = users.length +1;
    user.push(user);
    res.json(user).end();
    

})     
    

