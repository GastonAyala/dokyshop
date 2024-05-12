const db = require('../../../database/models');
const { literal, QueryTypes } = require('sequelize');
const { getOriginUrl } = require('../../utils');

module.exports = async (req, res) => {
    try {
        const countByCategory = await db.sequelize.query('SELECT categories.name, COUNT(categoryId) as count FROM products INNER JOIN categories ON categories.id = products.categoryId GROUP BY categoryId', {
            type: QueryTypes.SELECT
        })
        const { page } = req.query;
        const { docs: products, pages, total } = await db.product.paginate({
            page: +page,
            paginate: 10,
            include: [
                {
                    association: "category"
                },
                {
                    association: 'imagesecondaries',
                    attributes: {
                        include: [
                            [
                                literal(`CONCAT('${getOriginUrl(req)}/api/products/', file)`),
                                'imageSecondaryAPI'
                            ]
                        ]
                    },
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
                include: [
                    [
                        literal(`CONCAT('${getOriginUrl(req)}/api/products/', imagePrincipal)`),
                        'imagePrincipalAPI'
                    ],
                    [
                        literal(`CONCAT('${getOriginUrl(req)}/api/products/', product.id)`),
                        'detail'
                    ]
                ]
            }
        })

        const nextPage = pages === +page || page > pages ? null : +page + 1;
        const previousPage = +page > 1 && page <= pages ? +page - 1 : null
        res.status(200).json({
            ok: true,
            pages,
            count: total,
            countByCategory,
            next: nextPage ? getOriginUrl(req) + '/api/products?page=' + nextPage : null,
            prev: previousPage ? getOriginUrl(req) + '/api/products?page=' + previousPage : null,
            data: products
        })

    }
    catch (err) {
        res.status(500).json({
            ok: true,
            msg: err.message
        })
    }
}