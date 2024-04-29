const db = require("../../database/models")
module.exports = (req, res) => {
   
    db.category.findAll()
    .then((category)=>{  
       db.subcategory.findAll()
    .then((subcategory)=>{
      
       res.render("./admin/createProduct", {category, subcategory }, (err, contentView) => {
            err && res.send(err.message)
            res.render("./partials/dashboard", {
                contentView
            })
        })
    })  
  }) 
        
   

 
     }