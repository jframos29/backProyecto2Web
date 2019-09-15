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

const modificarCalendario = function (calendario, idUser, res) {
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("usuarios");
    col.find({ "idUsuario": idUser }).toArray((err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("El usuario no existe");
      }
      else {
        const obj = result[0];
        obj.calendario = calendario;
        col.replaceOne({ "idUsuario": idUser }, obj, (err) => {
          if (err) throw err;
          res.send("calendario actualizado")
          obj.parches.forEach(element => {
            recalcularLibres(element.nombreParche, element.idAdmin);
          });
          client.close();
        });
      }
    });
  });
}


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

const calendarioUsuario = function (value, res) {
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("usuarios");
    col.find({ "idUsuario": value }).toArray((err, result) => {
      if (err) throw err;
      const newResult = result.map((element) => {
        return element.calendario;
      });
      res.send(newResult);
      client.close();
    });
  });
};

const registrarUsuarioParche = function (body, idUser, res) {
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("parches");
    const col2 = db.collection("usuarios");
    const nombreParche = body.nombreParche;
    const idUsuario = body.idUser;
    col2.find({ "idUsuario": idUsuario }).toArray((err, result1) => {
      if (err) throw err;
      if (result1.length === 0) {
        res.send("El usuario a agregar no existe");
      }
      else {
        col.find({ "nombreParche": nombreParche, "idAdmin": idUser }).toArray((err, result) => {
          if (err) throw err;
          if (result.length === 0) {
            res.send("No esta autorizado");
          }
          else {
            const obj = result[0];
            const found = obj.integrantes.find(function (element) {
              return element === idUsuario;
            });
            if (typeof (found) === "undefined") {
              obj.integrantes.push(idUsuario);
              col.replaceOne({ "nombreParche": nombreParche, "idAdmin": idUser }, obj, (err) => {
                if (err) throw err;
                const col2 = db.collection("usuarios");
                col2.find({ "idUsuario": idUsuario }).toArray((err, result) => {
                  if (err) throw err;
                  const obj2 = result[0];
                  obj2.parches.push({
                    "nombreParche": nombreParche,
                    "idAdmin": idUser
                  })
                  col2.replaceOne({ "idUsuario": idUsuario }, obj2, (err) => {
                    if (err) throw err;
                    res.send("Registrado en parche");
                    recalcularLibres(nombreParche, idUser);
                    client.close();
                  });
                });
              });
            }
            else {
              res.send("El usuario ya está en el parche")
            }
          }
        });
      }
    });
  });
};

const busquedaParche = function (nombreParche, idAdmin, res) {
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("parches");
    col.find({ "nombreParche": nombreParche, "idAdmin": idAdmin }).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
      client.close();
    });
  });
};

const usuariosParche = function (nombreParche, idAdmin, res) {
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("parches");
    col.find({ "nombreParche": nombreParche, "idAdmin": idAdmin }).toArray((err, result) => {
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
          client.close();
          recalcularLibres(nombreParche, idUser);
        });
      }
    });
  });
}

const registrarUsuario = function (body, res) {
  const nombreUsuario = body.idUsuario;
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("usuarios");
    col.find({ "idUsuario": nombreUsuario }).toArray((err, result) => {
      if (err) throw err;
      if (!(result.length === 0)) {
        res.send("Error: El usuario ya existe");
      }
      else {
        body.parches = [];
        col.insert(body, function (err) {
          if (err) throw err;
          res.send("Usuario agregado");
          client.close();
        });
      }
    });
  });
}

const borrarParche = function (nombreParche, idUser, res) {
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("parches");
    const col2 = db.collection("usuarios");
    col2.find({ "idUsuario": idUser }).toArray((err, result1) => {
      if (err) throw err;
      if (result1.length === 0) {
        res.send("El usuario a eliminar no existe");
      }
      else {
        col.find({ "nombreParche": nombreParche, "idAdmin": idUser }).toArray((err, result) => {
          if (err) throw err;
          if (result.length === 0) {
            res.send("No esta autorizado");
          }
          else {
            const obj = result[0];
            if (obj.integrantes.length != 0) {
              res.send("El administrador de un parche no puede irse de un parche no vacío")
            }
            else {
              const found = obj.integrantes.find(function (element) {
                return element === idUser;
              });
              if (typeof (found) === "undefined") {
                res.send("El usuario no está en el parche");
              }
              else {
                col.deleteOne({ "nombreParche": nombreParche, "idAdmin": idUser }, (err) => {
                  if (err) throw err;
                  else {
                    const col2 = db.collection("usuarios");
                    col2.find({ "idUsuario": idUser }).toArray((err, result) => {
                      if (err) throw err;
                      const obj2 = result[0];
                      obj2.parches = obj2.parches.filter((elemento) => {
                        return !((elemento.nombreParche === nombreParche) & (elemento.idAdmin === idUser))
                      });
                      col2.replaceOne({ "idUsuario": idUser }, obj2, (err) => {
                        if (err) throw err;
                        res.send("Parche eliminado");
                        client.close();
                      });
                    });
                  }
                });
              }
            }
          }
        });
      }
    });
  });
}

const eliminarUsuarioParche = function (body, idUser, res) {
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("parches");
    const col2 = db.collection("usuarios");
    const nombreParche = body.nombreParche;
    const idUsuario = body.idUser;
    col2.find({ "idUsuario": idUsuario }).toArray((err, result1) => {
      if (err) throw err;
      if (result1.length === 0) {
        res.send("El usuario a eliminar no existe");
      }
      else {
        col.find({ "nombreParche": nombreParche, "idAdmin": idUser }).toArray((err, result) => {
          if (err) throw err;
          if (result.length === 0) {
            res.send("No esta autorizado");
          }
          else {
            const obj = result[0];
            if (idUsuario === idUser) {
              if (obj.integrantes.length != 0) {
                res.send("El administrador de un parche no puede irse de un parche no vacío")
              }
              else {
                borrarParche(nombreParche, idUser, res);
              }
            }
            else {
              const found = obj.integrantes.find(function (element) {
                return element === idUsuario;
              });
              if (typeof (found) === "undefined") {
                res.send("El usuario no está en el parche");
              }
              else {
                obj.integrantes = obj.integrantes.filter((elemento) => {
                  return (!(elemento === idUsuario))
                });
                col.replaceOne({ "nombreParche": nombreParche, "idAdmin": idUser }, obj, (err) => {
                  if (err) throw err;
                  else {
                    const col2 = db.collection("usuarios");
                    col2.find({ "idUsuario": idUsuario }).toArray((err, result) => {
                      if (err) throw err;
                      const obj2 = result[0];
                      obj2.parches = obj2.parches.filter((elemento) => {
                        return !((elemento.nombreParche === nombreParche) & (elemento.idAdmin === idUser))
                      });
                      col2.replaceOne({ "idUsuario": idUsuario }, obj2, (err) => {
                        if (err) throw err;
                        res.send("Eliminado del parche");
                        client.close();
                        recalcularLibres(nombreParche, idUser);
                      });
                    });
                  }
                });
              }
            }
          }
        });
      }
    });
  });
};

const login = function (body, res) {
  const username = body.username;
  const password = body.password;
  res.send(""+username+" "+password);
}

const recalcularLibres = function (nombreParche, idAdmin) {
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("parches");
    const col2 = db.collection("usuarios");
    col.find({ "nombreParche": nombreParche, "idAdmin": idAdmin }).toArray((err, result) => {
      const obj = result[0];
      obj.libres = new Array(1008).fill(undefined);
      obj.integrantes.forEach(element => {
        col2.find({ "idUsuario": element }).toArray((err, result) => {
          if (err) throw err;
          const obj2 = result[0];
          for (let i = 0; i < 1008; ++i) {
            if (obj2.calendario[i] === 1) {
              if (typeof (obj.libres[i]) === "undefined") {
                let arr = [];
                arr.push(element);
                obj.libres[i] = arr;
              }
              else {
                obj.libres[i].push(element);
              }
            }
          }
        });
      });
    });
  });
}

const verLibres = function (nombreParche, idAdmin, hora, res) {
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("parches");
    col.find({ "nombreParche": nombreParche, "idAdmin": idAdmin }).toArray((err, result) => {
      if (err) throw err;
      if (!(result.length === 0)) {
        const obj = result[0];
        res.send(obj.libres[hora]);
      }
      else {
        res.send("Error: No existe el parche")
      }
      client.close();
    });
  });
}

module.exports = {
  busquedaUsuario: busquedaUsuario,
  parchesUsuario: parchesUsuario,
  busquedaParche: busquedaParche,
  usuariosParche: usuariosParche,
  registrarParche: registrarParche,
  registrarUsuario: registrarUsuario,
  eliminarUsuarioParche: eliminarUsuarioParche,
  registrarUsuarioParche: registrarUsuarioParche,
  modificarCalendario: modificarCalendario,
  verLibres: verLibres,
  calendarioUsuario: calendarioUsuario,
  login: login
};