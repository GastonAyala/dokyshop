const db = require('../../database/models');

module.exports = (req, res) => {
    let { page, offset } = req.query

    if(!page) page = 1
    
    if(!offset) offset = 0

    db.product.findAndCountAll({
        limit: 5,
        offset: +offset,
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
        },
    })
    .then(products => {
        const count = products.count;
        const totalPages = Math.ceil(count / 5);
        const plusPage = +page + 1;
        const plusOffset = +offset + 5
        const lessPage = +page - 1;
        const lessOffset = +offset - 5
        
        res.render("products/listProduct", {
            products: products.rows,
            count,
            totalPages,
            page: plusPage,
            offset: plusOffset,
            lessPage,
            lessOffset

        })
    })
};