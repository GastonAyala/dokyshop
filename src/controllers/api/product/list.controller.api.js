const db = require('../../../database/models');
const { literal, QueryTypes } = require('sequelize');
const { getOriginUrl } = require('../../utils');
const { ErrorCustom } = require('../../utils/createError');
 
module.exports = async (req, res) => {
    try {
        const countByCategory = await db.sequelize.query('SELECT categories.name, COUNT(categoryId) as count FROM products INNER JOIN categories ON categories.id = products.categoryId GROUP BY categoryId', {
            type: QueryTypes.SELECT
        })
        if(!req.query.page) {
            const {count, rows: products} = await db.product.findAndCountAll({
                include: [
                    {
                        association: "category"
                    },
                    {
                        association: 'subcategory'
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
                    include: [
                        [
                            literal(`CONCAT('${getOriginUrl(req)}/api/products/', imagePrincipal)`),
                            'imagePrincipalAPI'
                        ],
                        [
                            literal(`CONCAT('${getOriginUrl(req)}/api/products/detail/', product.id)`),
                            'detail'
                        ]
                    ]
                }
            })
            res.status(200).json({
                ok: true,
                count,
                countByCategory,
                data: products
            })
        } else {
            const { page = "1", limit = "10" } = req.query;
            if(isNaN(+page) || isNaN(+limit)) {
                throw new ErrorCustom(400, 'El formato de página o límite no es válido')
            }
            const { docs: products, pages, total } = await db.product.paginate({
                page: +page,
                paginate: +limit,
                include: [
                    {
                        association: "category"
                    },
                    {
                        association: 'subcategory'
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
                            literal(`CONCAT('${getOriginUrl(req)}/api/products/detail/', product.id)`),
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
    }
    catch (err) {
        res.status(500).json({
            ok: true,
            msg: err.message
        })
    }
}