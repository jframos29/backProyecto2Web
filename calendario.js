const express = require('express')

const router = express.Router()

const bodyParser=require("body-parser");

const mongo = require("./mongo");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

// define the home page route
router.get('/calendarioEspecifico', function (req, res) {
})

router.post('/modificarCalendario', function(){

})

module.exports = router;