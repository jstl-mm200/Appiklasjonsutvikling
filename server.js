const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const user = require("./js/user.js");


app.set('port', (process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(user);

function isNameInList(list,name){
    let searchName = name.toLowerCase();
    let result = false;
    for(let student in list){
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