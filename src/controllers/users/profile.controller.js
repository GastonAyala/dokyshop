const { where } = require("sequelize");
const db = require("../../database/models")
module.exports = (req, res) => {
    const { id } = req.session.userLogin

    db.user.findByPk(id, { include: "address" })
    .then((user) => {
         res.render("users/profile", { user, address: user.address })
    })
    .catch(function(e){
        console.log("Error")
    })
};