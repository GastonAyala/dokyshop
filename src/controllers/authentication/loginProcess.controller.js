const { loadData } = require('../../data');
const { validationResult } = require("express-validator")

module.exports = (req, res) => {
   const errors = validationResult(req)

   if (errors.isEmpty()) {
      const { remember } = req.body;
      const users = loadData("users");  // todos lo sdatos de .json

      const userFind = users.find((u) => u.email === req.body.email.toLowerCase()); // busca coincidencia del email que llega del body con el email del json 

      const { name, email, role, avatar } = userFind;

      req.session.userLogin = {
         name,
         email,
         role,
         avatar
      };

      if (remember) res.cookie("userLogin", req.session.userLogin, { maxAge: (60000 * 10 ) * 6})

      return res.redirect("/");
      
   }

   res.render("./authentication/login", {
      old: req.body,
      errorsLog: errors.mapped()
   });
};