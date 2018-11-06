const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require("./js/db.js"); 
const authorize = require("./authorize.js");
const user = require("./js/users.js"); 
const que = require("./js/requestQue.js") 

app.set('port', (process.env.PORT || 8080));
app.use(express.static('Public'));
app.use(bodyParser.json());
app.use(user);
app.use(que);





app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Oops thats bad');
});

app.listen(app.get('port'), function() {
    console.log('Test', app.get('port'));
});