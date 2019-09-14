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
    let order_id = Number(event.path.id)
    let query = `
        CALL guests.get_order(UUID_TO_BIN(?),?);
    `;
    console.log("Running query", query);
    let results = await mysql.query(query, [ event.body.session_id, order_id ])
    await mysql.end()
    return results
}
