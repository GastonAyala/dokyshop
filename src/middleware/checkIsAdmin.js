const { loadData } = require("../data")

module.exports = (req, res, next) => {
    const users = loadData("users");

    if (req.session.userLogin && req.session.userLogin.role === "ADMIN") {
        const userFind = users.find(u => u.email === req.session.userLogin.email)
        if (userFind) {
            if (userFind.role === "ADMIN")

            return next();
        }
        else {
            return res.redirect("/");
        }
    };
    return res.redirect("/");
};