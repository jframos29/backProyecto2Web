const fs = require("fs");
const express = require("express");
const user = require("./user");
const parche = require("./parche");
const login = require("./login");
const app = express();
const PORT = process.env.PORT || 3000;

function readData(fnCBK, errCBK) {
  fs.readFile(
    "gananLosCorruptos.json",
    (err, data) => {
      if (err) {
        errCBK(err);
        return;
      }

      console.log("dos");
      JSON.parse(data).then((info)=>{
        console.log("got data", info.length);
        fnCBK(info);
      });
    }
  );
}

app.get("/", (req, res) => {
  res.send("Hola mundo!!!!")

});


app.use("/usuario", user);
app.use("/parche", parche);
app.use("/login", login);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`My app is running at http://0.0.0.0:${PORT}`);
});
