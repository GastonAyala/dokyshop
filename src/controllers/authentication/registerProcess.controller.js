const { loadData, saveData } = require('../../data');
const bcrypt = require('bcryptjs')
const {validationResult} = require("express-validator")

module.exports = (req, res) =>{
   const errors = validationResult(req)
   if(errors.isEmpty()) {
      const {name, email, password} = req.body;
      const users = loadData('users');
     
      const newUser = {
         id: !users.length ? 1 : users[users.length -1].id + 1,
         name: name ? name.trim() : '',
         email: email?.trim().toLowerCase(),  
         password: bcrypt.hashSync(password?.trim(), 12),
         role: 'REGULAR',
         avatar: req.files.avatar ? req.files.avatar[0].filename : "perfilUser.png",
         phone: "",
         addresses: {
            street: "",
            city: "",
            province: "",
            zipcode: "",
         },
      };

      users.push(newUser);

      saveData(users, "users");

      return res.redirect("/autenticacion/iniciar");
   }
   
   res.render("./authentication/register", {
      old: req.body, 
      errors: errors.mapped()
   })
}