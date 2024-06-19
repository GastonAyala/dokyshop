const db = require('../../../database/models');

module.exports = async (req, res) => {
    try {
        const { title, category, subcategory, description, price, sale, quantity, color, available } = req.body;
        let newImages = [];
        if (req.files?.imagesSecondary?.length) {
            newImages = req.files.imagesSecondary?.map((img) => {
                return {
                    file: img.filename,
                }
            });
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
            available: available === "on",
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