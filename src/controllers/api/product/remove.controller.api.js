const db = require('../../../database/models');
const { ErrorCustom } = require('../../utils/createError');
const path = require('path');
const fs = require('fs')

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) throw new ErrorCustom(400, 'El id no es un número');

        const product = await db.product.findByPk(id, {
            include: ["imagesecondaries"]
        });

        if (!product) throw new ErrorCustom(404, 'El producto no existe');

        if (product.imagePrincipal && product.imagePrincipal !== "no-image.png" && fs.existsSync(path.join(__dirname, "../../../../public/images/products/" + product.imagePrincipal))) {
            fs.unlinkSync(path.join(__dirname, "../../../../public/images/products/" + product.imagePrincipal));
        }

        if (product.imagesecondaries) {
            product.imagesecondaries.forEach((img) => {
                if (fs.existsSync(path.join(__dirname, "../../../../public/images/products/" + img.file))) {
                    fs.unlinkSync(path.join(__dirname, "../../../../public/images/products/" + img.file));
                }
            });
        }

        await db.product.destroy({
            where: {
                id
            }
        });

        return res.status(200).json({
            ok: true,
            msg: "Producto eliminado con éxito"
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
};