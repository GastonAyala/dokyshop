const router = require('express').Router();

const {search, home, faq, sendEmail} = require("../controllers/other")

router.get("/", home);
router.get("/home", (req, res) => res.redirect("/"));

router.post('/', sendEmail)

router.get("/buscar", search)

router.get('/preguntas-frecuentes', faq)

module.exports = router;