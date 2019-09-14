var express = require('express')

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
router.get('/', function (req, res) {

})
// define the about route
router.get('/verInfoUsuario', function (req, res) {

})

router.get('/misParches', function (req, res) {

})

router.post('/registrarParche', function (req, res) {

})

module.exports = router;