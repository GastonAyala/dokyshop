const { QueryTypes } = require('sequelize');
const db = require('../../database/models');
const { converMoneyArg } = require('../utils');

module.exports = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await db.product.findByPk(id,{
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt"
                ]
            },
            include: [{
                association: "imagesecondaries",
                attributes: ["file"]
            },
            {
                association: 'category'
            },
            {
                association: 'subcategory'
            }],
        })

        const countByCategory = await db.sequelize.query('SELECT categories.id, COUNT(categoryId) as count FROM products INNER JOIN categories ON categories.id = products.categoryId GROUP BY id', {
            type: QueryTypes.SELECT
        })

        let index = product.categoryId - 1

        const products = await db.product.findAll({
            offset: Math.floor(Math.random() * countByCategory[index].count),
            limit: 4,
            attributes: {
                exclude: [
                    "description",
                    "sale",
                    "quantity",
                    "colorId",
                    "available",
                    "createdAt",
                    "updatedAt"
                ]
            },
            where: {
                categoryId: product.categoryId
            }
        })
        return res.render("products/productDetail", {product, converMoneyArg, products})
    } catch (err) {
        return res.send(err.message)
    }
};