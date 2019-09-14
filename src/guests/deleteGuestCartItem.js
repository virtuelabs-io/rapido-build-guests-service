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
    let product_id = Number(event.path.id)
    let query = `
        DELETE FROM guests.cart_items
        WHERE session_id = UUID_TO_BIN(?)
        AND   product_id = ?
    `;
    console.log("Running query", query);
    let results = await mysql.query(query, [ event.body.session_id, product_id ])
    await mysql.end()
    return results
}
