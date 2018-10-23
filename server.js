const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const user = require("./js/user.js");


app.set('port', (process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(user);

