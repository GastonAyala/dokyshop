const db = require('../../../database/models');
const { ErrorCustom } = require('../../utils/createError');

module.exports = async (req, res) => {
    try {
        const { q = null } = req.query;

        if (!q) throw new ErrorCustom('La consulta no fue recibida')
        if (/UPDATE|DROP|ALTER|TRUNCATE/i.test(q)) throw new ErrorCustom(400, 'No puedes realizar consultas de tipo UPDATE, DROP, ALTER o TRUNCATE');

        const [data] = await db.sequelize.query(q);
        return res.status(200).json({
            ok: true,
            data,
        })

    } catch (error) {
        res.status(error.status || 500).json({
            ok: false,
            msg: error.message,
        })
    }
}