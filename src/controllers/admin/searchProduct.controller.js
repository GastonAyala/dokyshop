const { loadData } = require('../../data');

module.exports = (req, res) => {
    const { dashboardKeywords, filterSelect } = req.query
    const products = loadData()
    const productsFilter = products.filter(p => p.id == dashboardKeywords || p.title.toLowerCase().includes(dashboardKeywords?.toLowerCase()) || p.description.toLowerCase().includes(dashboardKeywords?.toLowerCase()) || p.category.toLowerCase().includes(filterSelect?.toLowerCase()))

    res.render("admin/searchProducResults", { products: productsFilter, dashboardKeywords, filterSelect}, (err, contentView) => {
        err && res.send(err.message)

        res.render("partials/dashboard", {contentView})
    })
}