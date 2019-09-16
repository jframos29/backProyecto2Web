//Acá es preferible usar const y no var, var está deprecado, además es recomendable usar el modo strict.
“use strict”
const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser");
const calendario = require("./calendario");
const mongo = require("./mongo");

router.use("/calendario", calendario);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

// define the about route
router.get("/verInfoUsuario", mongo.checkAuth, function (req, res) {
  //if (req.session.userId) {
    const idUser = req.header("idUsuario");
    mongo.busquedaUsuario(idUser, res);
  //}
  //else {
    //res.redirect("../login");
  //}
});

router.get("/misParches", function (req, res) {
  //if (req.session.userId) {
    const idUser = req.header("idUsuario");
    mongo.parchesUsuario(idUser, res);
  //}
  //else {
    //res.redirect("../login");
  //}
})

router.post("/registrarParche", function (req, res) {
  //if (req.session.userId) {
    const idUser = req.header("idUsuario");
    const body = req.body;
    mongo.registrarParche(idUser, body, res);
  //}
  //else {
    //res.redirect("../login");
  //}
})

module.exports = router;
