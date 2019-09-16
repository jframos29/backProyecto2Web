“use strict”
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
  //if(req.session.userId){
    mongo.eliminarUsuarioParche(req.body,req.header("idUsuario"),res);
  //}
  //else{
    //res.redirect("../../login");
  //}

})
// define the about route
router.get("/libres", function (req, res) {
  //if(req.session.userId){
    mongo.verLibres(req.header("nombreParche"),req.header("idAdmin"),req.header("hora"), res);
  //}
  //else{
    //res.redirect("../../login");
  //}
})

router.post("/registrarUsuario", mongo.checkAuth, function(req, res){
  //if(req.session.userId){
  mongo.registrarUsuarioParche(req.body,req.header("idUsuario"),res);
  //}
  //else{
    //res.redirect("../../login");
  //}
})

router.get("/usuariosParche", mongo.checkAuth,function (req, res) {
  //if(req.session.userId){
  mongo.usuariosParche(req.header("nombreParche"),req.header("idAdmin"), res);
  //}
  //else{
    //res.redirect("../../login");
  //}
})

router.get("/verInfoParche", mongo.checkAuth, function (req, res) {
  //if(req.session.userId){
  mongo.busquedaParche(req.header("nombreParche"),req.header("idAdmin"), res);
  //}
  //else{
    //res.redirect("../../login");
  //}
})

module.exports = router;
