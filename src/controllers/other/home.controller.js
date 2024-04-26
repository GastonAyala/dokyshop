const db = require('../../database/models');

module.exports = (req, res) => {
    db.product.findAll()
    .then(products => {
        res.render("other/home", {products})
    })
    .catch(err => {
        res.send(err.message)
    })
}