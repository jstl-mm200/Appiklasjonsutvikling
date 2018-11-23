const pg = require("pg");

const { Client } = require('pg');

let connectionString = process.env.DATABASE_URL || "postgres://ielnzuvplyxktr:2684f1c96c3c210eec56205658b62853a9af8279633f6f6166a2b98b1957afe0@ec2-46-137-75-170.eu-west-1.compute.amazonaws.com:5432/d2tjh4c7fbuo91";

connectionString += "?ssl=true";

const db = {}

async function runQuery(query) {
    let respons = null;
    const client = new Client({
        connectionString:connectionString,
        ssl: true
    })
   
    try {
        
        // Wait untill we have a connection to the database
        await client.connect();
        
        console.log("connected");
            
        // Waite untill the prommise has completed
        let res = await client.query(query).then(function (res) {
            // If you want to manipulate the respons it can be done in her.
            
            return res;
        }).catch(function (err) {
            console.log(err);
        });

        respons = res;       
      
    } catch (e) {
        console.log("Error ");
        console.log(e);
        /*OOPS*/
    }

    return respons;

}
db.insert = async function (query) {
    return await runQuery(query);
}

db.select = async function (query) {
    return await runQuery(query);
}

db.delete = async function (query) {
    //db.update(query);
    return await runQuery(query);
}

db.update = async function (query) {
    return await runQuery(query);
}

module.exports = db;