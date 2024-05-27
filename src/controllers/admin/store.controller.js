const db = require("../../database/models")
const fetch = require("node-fetch");
const { validationResult } = require("express-validator");

module.exports = (req, res) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
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
                } else {
                    return res.redirect(`/admin/productos`)
                }
            })
    } else {
        const categoryPromise = db.category.findAll()
        const subcategoryPromise = db.subcategory.findAll()
        const colorsPromsie = fetch('https://csscolorsapi.com/api/colors')
        Promise.all([categoryPromise, subcategoryPromise])
        .then(([category, subcategory]) => {
            colorsPromsie.then(res => res.json())
            .then((colorsJSON) => {
                const colors = colorsJSON.colors.sort((a, b) => a.group.localeCompare(b.group))
                return res.render("./admin/createProduct", {category, subcategory, colors, old: req.body, errors: errors.mapped() }, (err, contentView) => {
                    err && res.send(err.message)
                    return res.render("./partials/dashboard", {
                        contentView
                    });
                });
            })
            .catch(err => {
                return res.send(err.message)
            });
        });
    }
};