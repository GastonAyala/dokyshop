const db = require('../../database/models');
const { Op }  = require('sequelize');
const { converMoneyArg } = require('../utils');

module.exports = (req, res) => {
    let {productSearched, page, offset} = req.query

    if(!page) page = 1
    
    if(!offset) offset = 0

    db.product.findAndCountAll({
        limit: 5,
        offset: +offset,
        where: {
            [Op.or]: {
                title: {
                    [Op.like] : `%${productSearched}%`
                },
                description: {
                    [Op.like] : `%${productSearched}%`
                },
            },
        },
        attributes: {
            exclude: [
                "categoryId",
                "subcategoryId",
                "description",
                "sale",
                "quantity",
                "colorId",
                "available",
                "createdAt",
                "updatedAt"
            ],
        },
    })
    .then(products => {
        const count = products.count;
        const totalPages = Math.ceil(count / 5);
        const plusPage = +page + 1;
        const plusOffset = +offset + 5
        const lessPage = +page - 1;
        const lessOffset = +offset - 5

        res.render("other/results", {
            products: products.rows,
            count,
            productSearched,
            page : plusPage,
            lessPage,
            lessOffset,
            offset: plusOffset,
            totalPages,
            converMoneyArg
        })
    })
    .catch(err => {
        res.send(err.message)
    })
};