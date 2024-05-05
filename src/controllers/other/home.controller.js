const db = require('../../database/models');

module.exports = (req, res) => {
    db.faq.findAll()
    .then((faqs) =>{
    db.otherImage.findAll({
        where: {
            viewId: 1
        },
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt"
            ]
        }
    })
    .then((images) => {
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
            res.render("other/home", { products, images, faqs })
        })
        .catch(err => {
            res.send(err.message)
        })
    
    })
    
})
};