const express = require("express");
const user = require("./user");
const parche = require("./parche");
const login = require("./login");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/usuario", user);
app.use("/parche", parche);
app.use("/login", login);

app.get("/", (req, res) => {
  res.send("Back-end de UFree")
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`My app is running at http://0.0.0.0:${PORT}`);
});
