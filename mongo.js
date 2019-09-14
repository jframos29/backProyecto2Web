const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const conectar = (coleccion)=>{
  client.connect((err) => {
    if (err) throw err;

    console.log("Conectado con monguito!!!");

    const db = client.db("test");
    const col = db.collection(coleccion);
    return col;
  });
};

module.exports = {conectar};