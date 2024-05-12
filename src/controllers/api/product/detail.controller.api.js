const { literal } = require("sequelize");
const db = require("../../../database/models");
const { getOriginUrl } = require("../../utils");

module.exports = (req, res) =>{
    const { id } = req.params;
    db.product.findByPk(id, { 
        include: [
            {
                association: 'imagesecondaries',
                attributes: {
                    include: [
                        [
                            literal(`CONCAT('${getOriginUrl(req)}/api/products/', file)`),
                                'imageSecondaryAPI'
                        ],
                    ],
                },
            },
        ], 
        attributes:{
        exclude: ['createdAt', 'updatedAt'],
        include: [
            [
                literal(`CONCAT('${getOriginUrl(req)}/api/products/', imagePrincipal)`),
                'imagePrincipalAPI'
            ]
        ]
    }
})

    .then(product =>{
        res.status(200).json({
            ok: true,
            data: product
        })
    })
    .catch(err =>{
        res.status(500).json({
            ok: false,
            msg: err.message
        })
    })
}