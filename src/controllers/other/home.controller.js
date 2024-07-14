const db = require('../../database/models');
const { literal, QueryTypes } = require('sequelize');
const { converMoneyArg } = require('../utils');

module.exports = async (req, res) => {
    try {
        const views = await db.view.findOne({
            where: {
                name: 'home'
            },
            include: [{
                association: "banners",
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            {
                association: "otherImages",
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })

        const countByCategory = await db.sequelize.query('SELECT COUNT(categoryId) as count FROM categories INNER JOIN products ON categories.id = products.categoryId', {
            type: QueryTypes.SELECT
        })

        const subcategories = await db.subcategory.findAll({
            include: 'products'
        })

        const products = await db.product.findAll({
            offset: Math.floor(Math.random() * countByCategory[0].count),
            limit: 4,
            attributes: { exclude: ["categoryId", "subcategoryId", "description", "sale", "quantity", "color", "available", "createdAt", "updatedAt"]}
        })

        const faqs = await db.faq.findAll()
        
        return res.render("other/home", { banners: views.banners, otherImages: views.otherImages, subcategories, products, faqs, converMoneyArg })

    } catch (err) {
        return res.send(err.message)
    }
};