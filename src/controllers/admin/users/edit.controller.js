const db=require("../../../database/models")


module.exports = (req, res) => {
    const { id } = req.params;
    db.user.findOne({where:{id:+id}})
    .then((userFind)=>{
        return res.render("admin/users/editUser", { user : userFind},
        (err, contentView) => {
        err && res.send(err.message)
        res.render("partials/dashboard", {
            contentView
        });
    });
    })
     
    
};