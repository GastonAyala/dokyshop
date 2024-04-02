const { loadData } = require("../../data");

module.exports = (req, res) => {
    const users = loadData("users");    
    const userFind = users.find(u => u.email === req.session?.userLogin?.email)
    res.render("users/profile", {user : userFind})
};