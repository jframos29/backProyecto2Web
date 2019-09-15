const express = require("express")
const router = express.Router()
const bodyParser=require("body-parser");
const mongo = require("./mongo");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

// define the home page route
router.delete("/eliminarUsuario", function (req, res) {
  mongo.eliminarUsuarioParche(req.body,req.header("idUsuario"),res);
})
// define the about route
router.get("/libres", function (req, res) {
  mongo.verLibres(req.header("nombreParche"),req.header("idAdmin"),req.header("hora"), res);
})

router.post("/registrarUsuario", function(req, res){
  mongo.registrarUsuarioParche(req.body,req.header("idUsuario"),res);
})

router.get("/usuariosParche", function (req, res) {
  mongo.usuariosParche(req.header("nombreParche"),req.header("idAdmin"), res);
})

router.get("/verInfoParche", function (req, res) {
  mongo.busquedaParche(req.header("nombreParche"),req.header("idAdmin"), res);
})

module.exports = router;