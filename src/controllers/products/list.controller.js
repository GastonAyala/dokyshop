const db = require('../../database/models');
const { Op } = require('sequelize').Sequelize;
const { converMoneyArg, getOriginUrl } = require('../utils');

module.exports = async (req, res) => {
    try {
        let { page = 1 , limit = 5, subcategory, category } = req.query

        let whereClause = {}

        if (subcategory) whereClause.subcategoryId = subcategory;
        if (category) whereClause.categoryId = category;

        const { docs: products, pages, total } = await db.product.paginate({
            page: +page,
            paginate: +limit,
            attributes: {
                exclude: ["description", "sale", "quantity", "colorId", "available", "createdAt", "updatedAt"]
            },
            where: whereClause
        })

        const categories = await db.category.findAll()
        const subcategories = await db.subcategory.findAll()

        const nextPage = pages === +page || page > pages ? null : `?${category ? 'category=' + category + '&' : ''}${subcategory ? 'subcategory=' + subcategory + '&' : ''}page=${+page + 1}`;
        const previousPage = page > 1 ? `?${category ? 'category=' + category + '&' : ''}${subcategory ? 'subcategory=' + subcategory + '&' : ''}page=${page - 1}` : null;

        return res.render("products/listProduct", {
            products,
            total,
            page,
            pages,
            next: nextPage,
            prev: previousPage,
            subcategory,
            category,
            categories,
            subcategories,
            converMoneyArg,
            getOriginUrl
        })

    } catch (error) {
        return res.send(error)
    }
};