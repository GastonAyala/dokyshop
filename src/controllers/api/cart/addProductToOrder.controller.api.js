const db = require('../../../database/models');
const { getOrderPending, getTotalOrder } = require('../../utils');

module.exports = async (req, res) => {
    try {
        const { id: productId  } = req.params;
        if(!productId) throw new Error('El id no fue recibido');
    
        let [order, isCreate] = await getOrderPending(req);
     
        await db.orderproduct.create({
         orderId: order.id,
         productId,
         quantity: 1
        });
        order = await order.reload({
         include: [
             {
                 association: "products",
                 through: {
                     attributes: ['quantity']
                 }
             }
         ]
        });
     
        const total = getTotalOrder(order.products);
        order.total = total;
        await order.save();
     
        res.status(201).json({
         ok: true,
         msg: "Product agregado al carito con éxito"
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: err.message
        })
    }
}