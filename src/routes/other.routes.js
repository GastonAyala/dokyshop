const express = require('express');
const router = express.Router();

const {search, home, faq} = require("../controllers/other")

router.get("/", home);
router.get("/home", (req, res) => res.redirect("/"));

router.get("/buscar", search)

router.get('/preguntas-frecuentes', faq)

module.exports = router;