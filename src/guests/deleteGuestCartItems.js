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
    let query = `
        DELETE FROM guests.cart_items
        WHERE session_id = UUID_TO_BIN(?)
        AND   in_cart = TRUE
    `;
    console.log("Running query", query);
    let results = await mysql.query(query, [ event.path.id ])
    await mysql.end()
    return results
}
