const path = require('path');
const fs = require('fs');

const db = require("../../database/models")


module.exports = (req, res) => {
  
    const {title, category, subcategory,description, price, sale, quantity, color, available, imagePrimary, imagesSecondary} = req.body;
   
  //return res.send(req.body)
    db.product.create({
        title: title.trim(),
        categoryId: +category?.trim(),
        subcategoryId: +subcategory?.trim(),  
        description: description.trim(),             // trim() quita los espacios(delante, entre y final de una palabra)
        price: +price,
        sale: +sale,
        quantity: +quantity,
        colorId: null,
        available: available === "on",
        imagePrincipal: req.files.imagePrimary?.length
         ? req.files.imagePrimary[0]?.filename
          : "no-image.png"
    })
    .then((product)=>{
    let newImages = [];  
    if(req.files.imagesSecondary?.length){
            newImages = req.files.imagesSecondary?.map((img) => {
                return {
                    file: img.filename,
                    productId : product.id
                }
            })
         } 
    db.imagesecundary.bulkCreate(newImages)
    .then(()=>{
       
        return res.redirect(`/admin/productos`)
    })    
 })
   }