const db = require("../../database/models")
module.exports = (req, res) => {
    const { id } = req.session.userLogin

    db.user.findByPk(id, { include: "address" })
    .then((user) => {
        return res.render("users/profile", { user, address: user.address })
    })
    .catch((err) => {
        return res.send(err.message)
    })
};