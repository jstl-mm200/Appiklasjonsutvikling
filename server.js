const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require("./js/db.js");  
const users = require("./js/users.js"); 
const lists = require("./js/lists.js")

app.set('port', (process.env.PORT || 3000));
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Server har failet');
    next();    
});

app.use(users);
app.use(lists);

app.listen(app.get('port'), function() {
    console.log('Test', app.get('port'));
});


