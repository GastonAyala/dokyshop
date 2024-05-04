const db = require ('../../database/models')
module.exports = (req, res) => {
    const { id } = req.params
    const categoryPromise = db.category.findAll()
    const subcategoryPromise = db.subcategory.findAll()
    Promise.all([categoryPromise, subcategoryPromise])
    .then(([categories, subcategories]) => {
        db.product.findByPk(id, {
            include: ['imagesecondaries', 'category', 'subcategory']
        })
        .then(product => {
            res.render("./admin/editProduct", { product, categories, subcategories },(err, contentView) => {
                err && res.send(err.message)
                res.render("./partials/dashboard", {
                    contentView
                })
            })
        })
    })
    .catch(err => {
        res.send(err.message)
    })
}
