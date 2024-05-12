const { literal } = require("sequelize");
const db = require("../../../database/models");
const { getOriginUrl } = require("../../utils");

module.exports = (req, res) =>{
    const { id } = req.params;
    db.product.findByPk(id, { include: 'imagesecondaries', attributes:{
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