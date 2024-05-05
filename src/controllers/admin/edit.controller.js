const db = require ('../../database/models')
const fetch = require("node-fetch");
module.exports = (req, res) => {
    const { id } = req.params
    const categoryPromise = db.category.findAll()
    const subcategoryPromise = db.subcategory.findAll()
    const colorsPromsie = fetch('https://csscolorsapi.com/api/colors')
    Promise.all([categoryPromise, subcategoryPromise])
    .then(([categories, subcategories]) => {
        colorsPromsie.then(res => res.json())
        .then((colorsJSON) => {
            const colors = colorsJSON.colors.sort((a, b) => a.group.localeCompare(b.group))
            db.product.findByPk(id, {
                include: ['imagesecondaries', 'category', 'subcategory']
            })
            .then(product => {
            return res.render("./admin/editProduct", { product, categories, subcategories,colors },(err, contentView) => {
                    err && res.send(err.message)
            return res.render("./partials/dashboard", {
                        contentView
                    })
                })
            })
            .catch(err => {
                res.send(err.message)
            })
        })
        
        })
}
