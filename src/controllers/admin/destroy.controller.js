const db = require("../../database/models");
const path = require('path');
const fs = require('fs')

module.exports = (req, res) => {
  
  const { id } = req.params;

 
  db.product.findByPk(id, {
    include: ["imagesecondaries"]
  })
    .then((imgs) => {
      const imagesecondaries = imgs.imagesecondaries
      imagesecondaries.forEach(i => {
        let pathImgSecondary = path.join(__dirname, "../../../public/images/products/" + i.file)
        let existImgSecondary = fs.existsSync(pathImgSecondary)
        if (existImgSecondary) {
          if (imgs.file !== "no-image.png") {
            fs.unlinkSync(pathImgSecondary)
          }
        }})

        db.imagesecondary.destroy({
          where: { productId: +id }
        })
          .then(() => {
            db.product.destroy({
              where: { id: +id }
            })
              .then(() => {
                  let pathImgPrincipal = path.join(__dirname, "../../../public/images/products", imgs.imagePrincipal)
                  let existImgPrincipal = fs.existsSync(pathImgPrincipal)
                  if (existImgPrincipal) {
                    if (pathImgPrincipal !== "no-image.png") {
                      fs.unlinkSync(pathImgPrincipal)
                    }
                  }
                    res.redirect("/admin/productos")
                  ;
                })
              })
          })

      }
    

