const db = require('../../database/models');

module.exports = (req, res) => {
    db.otherImage.findAll({
        where: {
            viewId: 1
        }
    })
    .then((images) => {
        db.product.findAll({
            limit: 4
        })
    .then(products => {
        res.render("other/home", { products, images })
    })
    .catch(err => {
        res.send(err.message)
    })

    })
    
}