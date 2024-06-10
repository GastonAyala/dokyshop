const { QueryTypes } = require('sequelize');
const db = require('../../../database/models');
module.exports = async (req, res) => {
    try {
        const categories = await db.category.findAll({
            include: ['products']
        })
        const countByCategory = await db.sequelize.query('SELECT categories.name, COUNT(categoryId) as count FROM products INNER JOIN categories ON categories.id = products.categoryId GROUP BY categoryId', {
            type: QueryTypes.SELECT
        })

        res.status(200).json({
            ok: true,
            countByCategory,
            data: categories
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: err.message
        })
    }
};