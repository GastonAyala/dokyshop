const db = require("../../../database/models")

module.exports = (req, res) =>{
    db.user.findAll({
        include: ["address"],
        attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "password"]
        }
    })
    .then(users =>{
        res.status(200).json({
            ok: true,
            data: users
        })
    }).catch(err =>{
        res.status(500).json({
            ok: false,
            msg: err.message
        })
    })

 //   http://localhost:3030/api/users 
}