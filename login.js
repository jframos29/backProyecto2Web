var express = require("express")

var router = express.Router()
const bodyParser=require("body-parser");

const mongo = require("./mongo");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

// define the about route
router.post("/", function (req, res) {
  mongo.login(req.body,res, req);
})

router.get("/",function (req, res) {
  res.send("Se necesita autenticacion");
})

router.post("/registrar", (req, res) =>{
  mongo.registrarUsuario(req.body, res);
})

router.get("/logout", function(req, res) {
  if (req.session) {
    req.session.destroy(function(err) {
      if(err) {
        throw err;
      } else {
        return res.redirect("./");
      }
    });
  }
});

module.exports = router;