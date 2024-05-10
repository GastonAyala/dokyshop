const db = require('../../../database/models');
const { literal } = require('sequelize');
const getOriginUrl = require('../../utils/getOriginUrl');

module.exports = (req, res) => {
    const { page } = req.query;

    db.product.paginate({
        page: +page,
        paginate: 10,
        include: [
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
        .then(({ docs: products, pages, total }) => {
            const nextPage = pages === +page || page > pages ? null : +page + 1;
            const previousPage = +page > 1 && page <= pages ? +page - 1 : null
            res.status(200).json({
                ok: true,
                pages,
                count: total,
                next: nextPage ? getOriginUrl(req) + '/api/products?page=' + nextPage : null,
                prev: previousPage ? getOriginUrl(req) + '/api/products?page=' + previousPage : null,
                data: products
            })

        })

        .catch(err => {
            res.status(500).json({
                ok: true,
                msg: err.message
            })
        })
}