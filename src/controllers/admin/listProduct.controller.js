const db = require('../../database/models');
const { converMoneyArg } = require('../utils');


module.exports = (req, res) => {
    const categoryPromise = db.category.findAll()
    const subcategoryPromise = db.subcategory.findAll()
    Promise.all([categoryPromise, subcategoryPromise]).then(
        ([categories, subcategories]) => {
            db.product.findAll({
                include: ['imagesecondaries', 'category', 'subcategory']
            })
            .then(products => {
                res.render("./admin/listProducts", { products, categories, subcategories, converMoneyArg },
                (err, contentView) => {
                    err && res.send(err.message)
                    res.render("./partials/dashboard", {
                        contentView
                    })
                })
            })
        }
    )
    .catch(err => {
        res.send(err.message)
    })
};