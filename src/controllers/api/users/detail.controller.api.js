const { literal } = require("sequelize");
const db = require("../../../database/models");
const { getOriginUrl } = require("../../utils");

module.exports = (req, res) =>{
    const { id } = req.params;
    db.user.findByPk(id, { include: 'address', attributes:{
        exclude: ['password'],
        include: [
            [
                literal(`CONCAT('${getOriginUrl(req)}/api/users/', avatar)`),
                'imageAvatarAPI'
            ]
        ]
    } })
    .then(user =>{
        res.status(200).json({
            ok: true,
            data: user
        })
    })
    .catch(err =>{
        res.status(500).json({
            ok: false,
            msg: err.message
        })
    })
}