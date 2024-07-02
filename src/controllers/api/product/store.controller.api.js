const db = require('../../../database/models');

module.exports = async (req, res) => {
    try {
        const { title, category, subcategory, description, price, sale, quantity, color, available } = req.body;
        const newImages = [];

        if (req.files.imagesSecondary) {
            for (let i = 0; i < req.files.imagesSecondary.length; i++) {
                newImages.push({
                    file: req.files.imagesSecondary[i].filename,
                });
            }
        }

        await db.product.create({
            title,
            categoryId: +category,
            subcategoryId: +subcategory,
            description,
            price: +price,
            sale: +sale,
            quantity: +quantity,
            color,
            available: available === "true" || available === "on",
            imagePrincipal: req.files.imagePrimary?.length ? req.files.imagePrimary[0]?.filename : "no-image.png",
            imagesecondaries: newImages,
        }, {
            include: ["imagesecondaries"]
        })

        return res.status(201).json({
            ok: true,
            msg: "Producto creado con éxito"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};