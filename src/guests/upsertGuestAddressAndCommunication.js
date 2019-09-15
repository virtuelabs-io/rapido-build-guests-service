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
    let data = event.body
    let query = `
        INSERT INTO
            guests.address (
                session_id,
                full_name,
                address_type_id,
                addr_1,
                addr_2,
                city,
                county,
                country,
                postcode,
                email,
                phone_no
            )
        VALUES (UUID_TO_BIN(?),?,?,?,?,?,?,?,?,?,?)
        ON DUPLICATE KEY UPDATE
        full_name = ?,
        address_type_id = ?,
        addr_1 = ?,
        addr_2 = ?,
        city = ?,
        county = ?,
        country = ?,
        postcode = ?,
        email = ?,
        phone_no = ?;
    `;

    console.log("Running query", query);
    let results = await mysql.query(query, [
            event.path.id,
            data.full_name,
            data.address_type_id,
            data.addr_1,
            data.addr_2,
            data.city,
            data.county,
            data.country,
            data.postcode,
            data.email,
            data.phone_no,
            data.full_name,
            data.address_type_id,
            data.addr_1,
            data.addr_2,
            data.city,
            data.county,
            data.country,
            data.postcode,
            data.email,
            data.phone_no
        ]
    )
    await mysql.end()
    return results
}
