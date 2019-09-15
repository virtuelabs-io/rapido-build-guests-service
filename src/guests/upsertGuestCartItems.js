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
    let results = [];
    let query = `
        INSERT INTO
            guests.cart_items (
                session_id,
                product_id,
                quantity,
                in_cart
            )
        VALUES (UUID_TO_BIN(?),?,FLOOR(ABS(?)),?)
        ON DUPLICATE KEY UPDATE
        quantity = FLOOR(ABS(?)),
        in_cart = ?
    `;

    async function insertCartItems(element, callback){
        console.log("Running query", query);
        let rlt = await mysql.query(query, [
                event.path.id,
                element.product_id,
                element.quantity,
                element.in_cart,
                element.quantity,
                element.in_cart
            ]
        )
        callback(rlt)
    }

    data.forEach(element => {
        insertCartItems(element, async (rlt) => {
            results.push(rlt)
        })
    });

    await mysql.end()
    return results
}
