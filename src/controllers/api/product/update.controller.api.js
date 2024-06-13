const db = require('../../../database/models');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, subcategory, description, price, sale, quantity, color, available } = req.body;

        // product
        await db.product.update({
            title: title?.trim(),
            categoryId: +category,
            subcategoryId: +subcategory,
            description: description?.trim(),
            price: +price,
            sale: +sale,
            quantity: +quantity,
            color: color,
            available: available === "on",
            imagePrincipal: req.files.imagePrimary?.length && req.files.imagePrimary[0]?.filename,
        }, {
            where: {
                id: +id
            }
        })

        // images & delete old images
        let newImages = [];
        const product = await db.product.findByPk(id, {
            include: ["imagesecondaries"]
        });
        req.files.imagePrimary?.length && fs.existsSync(path.join(__dirname, "../../../../public/images/products/" + product.imagePrincipal)) && fs.unlinkSync(path.join(__dirname, "../../../../public/images/products/" + product.imagePrincipal));

        if (req.files.imagesSecondary?.length) {
            product.imagesecondaries.forEach((img) => {
                fs.existsSync(path.join(__dirname, "../../../../public/images/products/" + img.file)) && img.file !== "no-image.png" && fs.unlinkSync(path.join(__dirname, "../../../../public/images/products/" + img.file));
            })
        }

        if (req.files.imagesSecondary?.length) {
            newImages = req.files.imagesSecondary.map((img) => {
                return {
                    file: img.filename,
                    productId: +id
                }
            })
        }

        newImages.length && await db.imagesecondary.destroy({ where: { productId: +id } });

        newImages.length && await db.imagesecondary.bulkCreate(newImages);

        // response
        return res.status(200).json({
            ok: true,
            msg: "Producto actualizado con éxito"
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};