const db = require('../../../database/models');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, subcategory, description, price, sale, quantity, color, available } = req.body;

        await db.product.update({
            title: title?.trim(),
            categoryId: +category,
            subcategoryId: +subcategory,
            description: description?.trim(),
            price: +price,
            sale: +sale,
            quantity: +quantity,
            color: color,
            available: available === "true" || available === "on",
        }, {
            where: {
                id: +id
            }
        });

        // Actualizar imagen principal
        if (req.files.imagePrimary) {
            const product = await db.product.findByPk(id);
            if (product.imagePrincipal !== 'no-image.png') {
                fs.existsSync(path.join(__dirname, "../../../../public/images/products/" + product.imagePrincipal)) &&
                    fs.unlinkSync(path.join(__dirname, "../../../../public/images/products/" + product.imagePrincipal));
            }
            await db.product.update({
                imagePrincipal: req.files.imagePrimary[0].filename
            }, {
                where: {
                    id: +id
                }
            });
        }

        // Actualizar imágenes secundarias
        if (req.files.imagesSecondary?.length) {
            const product = await db.product.findByPk(id, {
                include: ["imagesecondaries"]
            });

            // Eliminar imágenes secundarias antiguas
            await Promise.all(product.imagesecondaries.map(async (img) => {
                if (img.file !== 'no-image.png') {
                    fs.existsSync(path.join(__dirname, "../../../../public/images/products/" + img.file)) &&
                        fs.unlinkSync(path.join(__dirname, "../../../../public/images/products/" + img.file));
                }
            }));

            // Crear nuevas imágenes secundarias
            const newImages = req.files.imagesSecondary.map((img) => ({
                file: img.filename,
                productId: +id
            }));
            await db.imagesecondary.destroy({ where: { productId: +id } });
            await db.imagesecondary.bulkCreate(newImages);
        }

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
