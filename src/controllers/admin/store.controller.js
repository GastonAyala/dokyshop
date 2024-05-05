const db = require("../../database/models")

module.exports = (req, res) => {

    const { title, category, subcategory, description, price, sale, quantity, color, available } = req.body;

    db.product.create({
        title: title.trim(),
        categoryId: +category?.trim(),
        subcategoryId: +subcategory?.trim(),
        description: description.trim(),
        price: +price,
        sale: +sale,
        quantity: +quantity,
        color: color,
        available: available === "on",
        imagePrincipal: req.files.imagePrimary?.length
            ? req.files.imagePrimary[0]?.filename
            : "no-image.png"
    })
    .then((product) => {
        let newImages = [];
        if (req.files?.imagesSecondary?.length) {
            newImages = req.files.imagesSecondary?.map((img) => {
                return {
                    file: img.filename,
                    productId: product.id
                }
            })
            db.imagesecondary.bulkCreate(newImages)
            .then(() => {
                return res.redirect(`/admin/productos`)
            })
            .catch(err => {
                res.send(err.message)
            })
        }
        return res.redirect(`/admin/productos`)
    })
};