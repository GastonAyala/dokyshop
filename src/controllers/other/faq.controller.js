const db = require('../../database/models')

module.exports= (req, res) =>{
    db.faq.findAll()
    .then((faqs) =>{
        res.render('other/faq.ejs',{
            faqs
        })
    })
    .catch(err => {
        res.send(err.message)
    })
}
