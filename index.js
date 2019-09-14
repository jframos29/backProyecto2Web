const fs = require("fs");
const express = require("express");
const user = require('./user')
const parche = require('./parche')
const mongo = require("./mongo")
const app = express();
const PORT = 8080;




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

app.get("/data", (req, res) => {
  console.log("Got GET /data");

  const coleccion=mongo(res);

});

app.use("/usuario", user)
app.use("/parche", parche)

app.listen(PORT, () => {
  console.log(`My app is running at http://localhost:${PORT}`);
});
