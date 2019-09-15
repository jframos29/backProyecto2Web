var express = require("express")
var router = express.Router()
const bodyParser=require("body-parser");
const calendario = require("./calendario");
const mongo = require("./mongo");

router.use("/calendario",calendario);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

// define the home page route

// define the about route
router.get("/verInfoUsuario", function (req, res) {
  const idUser=req.header("idUsuario");
  mongo.busquedaUsuario(idUser, res);
});

router.get("/misParches", function (req, res) {
  const idUser=req.header("idUsuario");
  mongo.parchesUsuario(idUser, res);
})

router.post("/registrarParche", function (req, res) {
  const idUser=req.header("idUsuario");
  const body = req.body;
  mongo.registrarParche(idUser, body, res)
})

module.exports = router;