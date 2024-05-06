const db = require('../../database/models');

const bcrypt = require('bcryptjs')
const {validationResult} = require("express-validator")

module.exports =  async (req, res) =>{
   const errors = validationResult(req)
   
   if(errors.isEmpty()) {
      const {name, email, password} = req.body;
      const newAdress = await db.address.create({
         street: null,
         city: null,
         province:  null,
         zipCode: null
      })

      db.user.create({
         name: name ? name.trim() : '',
         email: email?.trim().toLowerCase(),  
         password: bcrypt.hashSync(password?.trim(), 12),
         avatar: req.files.avatar ? req.files.avatar[0].filename : "perfilUser.png",
         phone: null,
         addressId: newAdress.id
      })

      return res.redirect("/autenticacion/iniciar");
   } else {
      res.render("./authentication/register", {
         old: req.body, 
         errors: errors.mapped()
      })
   }
};