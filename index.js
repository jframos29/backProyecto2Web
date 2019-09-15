const express = require("express");
const user = require("./user");
const parche = require("./parche");
const login = require("./login");
const cors = require("cors");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(session({
  secret: "work hard",
  resave: true,
  saveUninitialized: false
}));

app.use("/usuario", user);
app.use("/parche", parche);
app.use("/login", login);

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send("Back-end de UFree")
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`My app is running at http://0.0.0.0:${PORT}`);
});
