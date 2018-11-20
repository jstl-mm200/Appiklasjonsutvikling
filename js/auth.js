const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('./db'); //database
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SECRET -----------------------------
const secret = SUPER_SECRET_KEY = process.env.TOKEN_KEY || "TransparantWindowsFlyingMonkeys";

// AUTHENTICATE USER ------------------
router.authenticateUser = function (req,res,next) {
    let userId = req.get("user_id");
    let clientToken = req.get("Auth");
    let tokenOK = bcrypt.compareSync(userId + secret, clientToken);
    if (tokenOK == true) {
        console.log("Token er ok!");
        next();
        
    } else {
        console.log("Token er ikke ok!");
        res.status(401).end();
    }

}

// EXPORTS ----------------------------
module.exports = router;