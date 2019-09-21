// internal function
'use strict';

const mysql = require('serverless-mysql')({
    config: {
        host: process.env.HOST,
        user: process.env.USERNAME,
        port: process.env.PORT,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
})

module.exports.fun = async (event, context, callback) => {
    global.fetch = require('node-fetch');
    console.log(event)
    let session_id = event.session_id
    let order_id = Number(event.order_id)
    let query = `
        SELECT order_price
        FROM guests.header
        WHERE session_id = UUID_TO_BIN(?)
        AND   id = ?;`
    console.log("Running query", query);
    let results = await mysql.query(query, [ session_id, order_id ])
    await mysql.end()
    return results
}
