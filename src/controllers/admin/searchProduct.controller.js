const db = require('../../database/models');
const { Op } = require('sequelize').Sequelize;
const { converMoneyArg } = require('../utils');

module.exports = (req, res) => {
    const { dashboardKeywords, categorySearch, subcategorySearch } = req.query;

    db.product.findAll({
        include: ['imagesecondaries', 'category', 'subcategory'],
        where: {
            [Op.or]: {
                title: {
                    [Op.like]: `%${dashboardKeywords}%`
                },
                description: {
                    [Op.like]: `%${dashboardKeywords}%`
                },
                categoryId: categorySearch ? categorySearch : null,
                subcategoryId: subcategorySearch ? subcategorySearch : null
            },
        },
    })
    .then(products => {
        const categoryPromise = db.category.findAll()
        const subcategoryPromise = db.subcategory.findAll()
        Promise.all([categoryPromise, subcategoryPromise])
        .then(([categories, subcategories]) => {
            res.render("admin/searchProducResults", { products, dashboardKeywords, categorySearch, subcategorySearch, categories, subcategories, converMoneyArg }, (err, contentView) => {
                err && res.send(err.message)
                res.render("partials/dashboard", { contentView })
            })
        })
    })
    .catch(err =>{
        res.send(err.message)
    })
};