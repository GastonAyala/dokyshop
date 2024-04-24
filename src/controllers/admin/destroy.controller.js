const {saveData, loadData} = require("../../data");
const path = require('path');
const fs = require('fs')

module.exports = (req, res)=>{
    const product = loadData()
    const {id} = req.params;
    
    const producLessOne = product.filter(p => p.id !== +id);
      // traeme todos los productos menos el id que entra por en params
    const prodDestroy = product.find(p => p.id === +id)

    const pathFile = path.join(__dirname, "../../../public/images/products/" + prodDestroy.imagePrimary);
    const existFile = fs.existsSync(pathFile)
    if(existFile) {
      if(prodDestroy.imagePrimary[0] !== "no-image.png" && prodDestroy.imagePrimary?.length) {
        fs.unlinkSync(pathFile)
      }
    }

    
    for (let i = 0; i < prodDestroy.imagesSecondary.length; i++) {
      let imgSecondary = prodDestroy.imagesSecondary[i];
      
      let pathImgSecondary = path.join(__dirname, "../../../public/images/products/" + imgSecondary)
      
      let existImgSecondary = fs.existsSync(pathImgSecondary)
      
      if(existImgSecondary) {
        if(imgSecondary !== "no-image.png") {
          fs.unlinkSync(pathImgSecondary)
        }
      }
    }

    saveData(producLessOne);  // guarda el resto de los productos menos el que entra por el params que se desea eliminar
    
    res.redirect("/admin/productos")
}
