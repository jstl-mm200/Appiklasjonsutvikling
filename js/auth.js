
const jwt = require('jsonwebtoken');

// SECRET -----------------------------
const SUPER_SECRET_KEY = process.env.TOKEN_KEY || "TransparantWindowsFlyingMonkeys";

// AUTHENTICATE USER ------------------
function authenticateUser (req,res,next) {
   
    let token = req.headers['x-access-auth'] || req.body.auth || req.params.auth; // Suporting 3 ways of submiting token
    console.log(token);
    try {
        let decodedToken = jwt.verify(token, SUPER_SECRET_KEY); // Is the token valid?
        req.token = decodedToken; // we make the token available for later functions via the request object.
        next(); // The token was valid so we continue 
    } catch (err) {
        res.status(401).end(); // The token could not be validated so we tell the user to log in again.
    }
}


// EXPORTS ----------------------------
module.exports = authenticateUser;