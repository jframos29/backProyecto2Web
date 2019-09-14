const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://admin:password123@ds141815.mlab.com:41815/ufree";

const busquedaUsuario = function (value, res) {
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("usuarios");
    col.find({ "idUsuario": value }).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
      client.close();
    });
  });
};

const parchesUsuario = function (value, res) {
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("usuarios");
    col.find({ "idUsuario": value }).toArray((err, result) => {
      if (err) throw err;
      const newResult = result.map((element) => {
        return element.parches
      });
      res.send(newResult);
      client.close();
    });
  });
};

const busquedaParche = function (value, res) {
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("parches");
    col.find({ "idParche": value }).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
      client.close();
    });
  });
};

const usuariosParche = function (value, res) {
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("parches");
    col.find({ "idParche": value }).toArray((err, result) => {
      if (err) throw err;
      const newResult = result.map((element) => {
        return element.integrantes
      });
      res.send(newResult);
      client.close();
    });
  });
};

const registrarParche = function (idUser, body, res) {
  const nombreParche = body.nombreParche;
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("parches");
    col.find({ "nombreParche": nombreParche, "idAdminParche": idUser }).toArray((err, result) => {
      if (err) throw err;
      if (!(result.length === 0)) {
        res.send("Error: El parche ya existe");
      }
      else {
        const arrIntegrantes = [idUser];
        body.idAdminParche = idUser;
        body.integrantes = arrIntegrantes;
        col.insert(body, function (err) {
          if (err) throw err;
          res.send("Parche agregado");
        });
      }
    });
  });
}

const registrarUsuario = function(){

}

const eliminarUsuarioParche= function(){

}

module.exports = {
  busquedaUsuario: busquedaUsuario,
  parchesUsuario: parchesUsuario,
  busquedaParche: busquedaParche,
  usuariosParche: usuariosParche,
  registrarParche: registrarParche,
  registrarUsuario: registrarUsuario,
  eliminarUsuarioParche: eliminarUsuarioParche
};