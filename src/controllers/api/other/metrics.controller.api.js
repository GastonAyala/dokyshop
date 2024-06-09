const db = require('../../../database/models');

module.exports = async (req, res) => {
    const query = `
    SELECT 
    'Total de productos' AS title,
    'primary' AS color,
    'box-open' AS icon,
     COUNT(id) AS digit FROM products
     
     `;
    try {
        const [data] = await db.sequelize.query(query);

        return res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        res.status(error.status || 500).json({
            ok: false,
            msg: error.message,
        });
    }
};
