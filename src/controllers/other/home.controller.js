const db = require('../../database/models');

module.exports = (req, res) => {
    const viewPromsie = db.view.findOne({
        where: {
            name: 'home'
        },
        include: [{
            association: "banners",
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
            association: "otherImages",
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        }],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    const subcategoriesPromsie = db.subcategory.findAll()
    const productsPromise = db.product.findAll({
        limit: 4,
        attributes: { exclude: ["categoryId", "subcategoryId", "description", "sale", "quantity", "color", "available", "createdAt", "updatedAt"]}
    })
    const faqPromise = db.faq.findAll()
    Promise.all([viewPromsie, subcategoriesPromsie  ,productsPromise, faqPromise])
    .then(([views, subcategories ,products, faqs]) => {
        return res.render("other/home", { banners: views.banners, otherImages: views.otherImages, subcategories, products, faqs })
    })
    .catch(err => {
        res.send(err.message)
    })
};