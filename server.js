const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = ('port', (process.env.PORT || 8080));

app.set('port', port);
app.use(express.static('Public'));
app.use(bodyParser.json());
app.listen(app.get('port'), function() {
    console.log('Event server running', app.get('port'));
    
});

    

const users = [];

app.post("/api/user",function(req,res){
    
    let user = req.body;
    user.id = users.length +1;
    user.push(user);
    res.json(user).end();
    

})     
    

