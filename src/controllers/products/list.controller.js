const db = require('../../database/models');
const { Op } = require('sequelize').Sequelize;
const { toThousand } = require('../utils');

module.exports = async (req, res) => {
    let { page, offset, subcategory } = req.query

    if (!page) page = 1

    if (!offset) offset = 0

    let products = []

    if (subcategory) {
        products = await db.product.findAndCountAll({
            limit: 5,
            offset: +offset,
            attributes: {
                exclude: ["categoryId", "subcategoryId", "description", "sale", "quantity", "colorId", "available", "createdAt", "updatedAt"]
            },
            where: {
                [Op.or]: {
                    subcategoryId: {
                        [Op.like]: `${subcategory}`
                    }
                }
            }
        })
    } else {
        products = await db.product.findAndCountAll({
            limit: 5,
            offset: +offset,
            attributes: {
                exclude: ["categoryId", "subcategoryId", "description", "sale", "quantity", "colorId", "available", "createdAt", "updatedAt"]
            }
        })
    }

    const count = products.count;
    const totalPages = Math.ceil(count / 5);
    const plusPage = +page + 1;
    const plusOffset = +offset + 5
    const lessPage = +page - 1;
    const lessOffset = +offset - 5

    return res.render("products/listProduct", {
        products: products.rows,
        count,
        totalPages,
        page: plusPage,
        offset: plusOffset,
        lessPage,
        lessOffset,
        subcategory,
        toThousand
    })
};