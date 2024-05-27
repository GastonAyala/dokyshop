const db = require("../../database/models");
const fetch = require("node-fetch");
module.exports = (req, res) => {
    const categoryPromise = db.category.findAll()
    const subcategoryPromise = db.subcategory.findAll()
    const colorsPromsie = fetch('https://csscolorsapi.com/api/colors')
    Promise.all([categoryPromise, subcategoryPromise])
    .then(([category, subcategory]) => {
        colorsPromsie.then(res => res.json())
        .then((colorsJSON) => {
            const colors = colorsJSON.colors.sort((a, b) => a.group.localeCompare(b.group))
            return res.render("./admin/createProduct", {category, subcategory, colors }, (err, contentView) => {
                err && res.send(err.message)
                return res.render("./partials/dashboard", {
                    contentView
                })
            })
        })
        .catch(err => {
            return res.send(err.message)
        })
    })
};