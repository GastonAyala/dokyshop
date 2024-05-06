const db = require("../../database/models");
const path = require('path');
const fs = require('fs');
const product = require("../../database/models/product");

module.exports = (req, res) => {
    const { id } = req.params;
    const { title, category, subcategory, description, price, sale, quantity, color, available } = req.body;

    db.product.findAll({
        include:["imagesecondaries"],
        where: { id: +id }
    })
    .then(product => {
        let newImages = [];
        if (req.files.imagesSecondary?.length) {
            newImages = req.files.imagesSecondary.map((img) => ({
                file: img.filename,
                productId: +id
            }));
        }
        if (req.files.imagePrimary?.length) {
            const pathImagePrincipal = path.join(__dirname,"../../../public/images/products/" + product[0].imagePrincipal)
            const existsImagePrincipal = fs.existsSync(pathImagePrincipal) 
            if (existsImagePrincipal) {
            if (pathImagePrincipal !== "no-image.png")
            fs.unlinkSync(pathImagePrincipal)
        }
        }
        db.product.update({
            title: title.trim(),
            categoryId: +category?.trim(),
            subcategoryId: +subcategory?.trim(),
            description: description.trim(),
            price: +price,
            sale: +sale,
            quantity: +quantity,
            color: color,
            available: available === "on",
            imagePrincipal: req.files.imagePrimary?.length && req.files.imagePrimary[0]?.filename
        }, {
            where: { id: +id }
        })
        .then(() => {
            if (req.files.imagesSecondary?.length) {
                product[0].imagesecondaries.forEach(image => {
                    const pathImageSecondary = path.join(__dirname,"../../../public/images/products/" + image.file)
                    const existsImageSecondary = fs.existsSync(pathImageSecondary) 
                    if (existsImageSecondary) {
                        if (pathImageSecondary !== "no-image.png")
                        fs.unlinkSync(pathImageSecondary)
                    }
                })   
            }
            db.imagesecondary.destroy({ where: { productId: id } })
            .then(() => {
                if (newImages.length > 0) {
                    db.imagesecondary.bulkCreate(newImages)
                    .then(() => {
                        res.redirect("/admin/productos");
                    })
                    .catch(err => {
                        res.send(err.message);
                    });
                } else {
                    res.redirect("/admin/productos");
                }
            })
        })
    })
};


