const DbService = require('../Services/DbService')
const OrderService = require('../Services/OrderService')

let createNewOrder = (req, res) => {
    DbService.connectToDb(async (db) => {
        const order = {
            name: req.body.name,
            deliveryAddress: req.body.deliveryAddress,
            email: req.body.email,
            orderItems: req.body.orderItems
        }
        try {
            const newOrder = await OrderService.createNewOrder(db, order)
            if (newOrder.insertedCount === 1) {
                return res.json({
                    "success": true,
                    "message": "Order created",
                    "status": 200,
                    "data": newOrder
                })
            }
        } catch (e) {
            return res.json({
                "success": false,
                "message": "Database request failed",
                "status": 404
            })
        }
    })
}

const addToOrder = (req, res) => {
    DbService.connectToDb(async (db) => {
        const result = await OrderService.addOneItemToOrder(db, req)
        res.json({ "name": 1 })
    })
}

module.exports.createNewOrder = createNewOrder
module.exports.addToOrder = addToOrder