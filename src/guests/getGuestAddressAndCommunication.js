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
    let data = event.body
    let query = `
        SELECT full_name,
            address_type_id,
            addr_1,
            addr_2,
            city,
            county,
            country,
            postcode,
            email,
            phone_no
        FROM guests.address
        WHERE session_id = UUID_TO_BIN(?);
    `;

    console.log("Running query", query);
    let results = await mysql.query(query, [ data.session_id ] )
    await mysql.end()
    return results
}
