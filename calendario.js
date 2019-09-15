const express = require("express")
const router = express.Router()
const bodyParser=require("body-parser");
const mongo = require("./mongo");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));


router.get("/calendarioEspecifico", function (req, res) {
  //if(req.session.userId){
  mongo.calendarioUsuario(req.header("idUsuario"),res);
//}
  //else{
    //res.redirect("../../login");
  //}
});

router.post("/modificarCalendario", function(req, res){
  //if(req.session.userId){
  mongo.modificarCalendario(req.body.calendario, req.header("idUsuario"), res);
//}
  //else{
    //res.redirect("../../login");
  }
);

module.exports = router;