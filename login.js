var express = require('express')

var router = express.Router()
const bodyParser=require("body-parser");

const mongo = require("./mongo");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

// define the about route
router.post('/', function (req, res) {

})

router.post("/registrar", (req, res) =>{

})

module.exports = router;