const db = require('../../../database/models');
const { QueryTypes } = require('sequelize')

module.exports = async (req, res) => {
    try {
        const subcategories = await db.subcategory.findAll({
            include: ['products']
        })
        const countBySubcategory = await db.sequelize.query('SELECT subcategories.name, COUNT(subcategoryId) as count FROM products INNER JOIN subcategories ON subcategories.id = products.subcategoryId GROUP BY subcategoryId;', {
            type: QueryTypes.SELECT
        })

        res.status(200).json({
            ok: true,
            countBySubcategory,
            data: subcategories
        })
        
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: err.message
        })
    }
};