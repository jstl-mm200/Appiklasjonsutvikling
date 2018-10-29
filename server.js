const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require("./js/db.js");
const user = require("./js/users.js");

let userNames = [];


app.set('port', (process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(user);

app.get('/app/requests', function(req,res, next){
    res.json(userNames).end();
});

app.post('/app/request', function (req,res,next){
    let userName = req.body.userName;
    let isUnique = ! isNameInList(userNames, userName);

    if(isUnique && userName){
        userNames.push(req.body.userName);
        res.status(200).json(userNames).end();
    } else{
        res.status(400).json(userNames).end();
        res.se
    }
});

function isNameInList(list,name){
    let searchName = name.toLowerCase();
    let result = false;
    for(let user in list){
		if(list[user].toLowerCase() === searchName){
            result = true;
            break;
		}
    }
	return result;
}

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Oops thats bad');
});

app.listen(app.get('port'), function() {
    console.log('Drowning pool server', app.get('port'));
});