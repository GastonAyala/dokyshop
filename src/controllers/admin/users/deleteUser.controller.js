module.exports = (req, res) =>{
    const {id, name} = req.query;

    res.render("admin/users/deleteUser", {id, name}, (err, contentView)=> {
        err && res.send(err.message)

        res.render("partials/dashboard", { contentView })
    })
    
};