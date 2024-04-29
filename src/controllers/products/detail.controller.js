const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../../database/models');

module.exports = (req, res)=>{
    const {id} = req.params;
    db.product.findByPk(id,{
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt"
            ]
        },
        include: [{
            association: "imagesecondaries",
            attributes: ["file"]
        }],
    })
    .then(product => {
        db.product.findAll({
            limit: 4,
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
                ]
            }
        })
        .then(products => {
            res.render("products/productDetail", {product, toThousand, listProduct: products})
        })
        .catch(err => {
            err.message
        })
    })
}