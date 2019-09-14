var express = require('express')

var router = express.Router()
const bodyParser=require("body-parser");

const mongo = require("./mongo");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

// define the home page route
router.delete('/eliminarUsuario', function (req, res) {
})
// define the about route
router.get('/libres', function (req, res) {

})

router.post('/registrarUsuario', function(){

})

router.get('/usuariosParche', function (req, res) {
})

module.exports = router;