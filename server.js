const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = ('port', (process.env.PORT || 8080));
app.set('port', port);
app.use(express.static('public'));
app.use(bodyParser.json());

app.listen(app.get('port'), function() {
    console.log('Event server running', app.get('port'));
});