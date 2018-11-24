const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require("./js/db.js");  
const users = require("./js/users.js"); 
const lists = require("./js/lists.js")

app.set('port', (process.env.PORT || 3000));
app.use(express.static('Public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Server har failet');
    next();    
});

app.use(users);
app.use(lists);

var path = require('path');
global.appRoot = path.resolve(__dirname);

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('Public'));
}

app.get('*', (request, respons) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
})

app.listen(app.get('port'), function() {
    console.log('Test', app.get('port'));
});
