const express = require('express')
const router = express.Router()
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
  mongo.usuariosParche(req.header("idParche"), res);
})

router.get('/verInfoParche', function (req, res) {
  mongo.busquedaParche(req.header("idParche"), res);
})

module.exports = router;