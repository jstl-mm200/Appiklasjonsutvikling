const express = require('express')
const router = express.Router();
const db = require("./js/db.js");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const SUPER_SECRET_KEY = process.env.TOKEN_KEY || "TransparantWindowsFlyingDonkeys"; // for use with web token.

router.get("/app/authenticate", async function (req, res, next) {

    log("Authentication request recived");
    let authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) { // If there is no authorization header the client has not done a proper request.
        log("Missing authentication header, ending request with 401 code");
        res.status(401).end(); // We respond by telling the client that it has not been authenticated as of yet. (this brakes with basic auth since we are not setting the header)
    } else {

        let credentials = authorizationHeader.split(' ')[1]; // We know that the header value starts with Basic and then a space. Annything following that space will be the credentials from the client.
        let rawData = Buffer.from(credentials, 'base64'); // At the moment the the credentials are in a base 64 encoded format, so we must do a transformative step.
        credentials = rawData.toLocaleString().split(":"); // We know that the username and password are delimited by a :. Spliting on : gives us an array wit username at pos 0 and password at pos 1. 

        log(`Authenticate : ${credentials[0]} `);

        let username = credentials[0].trim();
        let password = credentials[1].trim();

        let user = await runQuery(username, password) // if the username and password are correct we will get a user object in return at this point.

        if (user) {
            // There was a user in the database with the correct username and password
            // This is where we are diverging from the basic authentication standard. by creating a token for the client to use in all later corespondanse. 
            log("User is authenticated");
            let token = jwt.sign({
                //id: user.id,
                username: username
            }, SUPER_SECRET_KEY); // Create token 

            res.status(200).send({
                auth: token,
                user: {
                    //id: user.id,
                    name: username
                }
            }).end(); // Send token and authenticated user to client.

        } else {
            // The request did not have valid credentials. 
            log("Bad credentials");
            res.status(401).end(); // We respond by telling the client that it has not been authenticated as of yet.
        }
    }
});

module.exports = router;