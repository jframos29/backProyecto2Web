const express = require("express")
const router = express.Router()
const bodyParser=require("body-parser");
const mongo = require("./mongo");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get("/calendarioEspecifico", function (req, res) {
  mongo.calendarioUsuario(req.header("idUsuario"),res);
});

router.post("/modificarCalendario", function(req, res){
  mongo.modificarCalendario(req.body, req.header("idUsuario"), res);
});

module.exports = router;