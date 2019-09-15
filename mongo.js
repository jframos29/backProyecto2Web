const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");
const url = "mongodb://admin:password123@ds141815.mlab.com:41815/ufree";


const busquedaUsuario = function (value, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("usuarios");
    col.find({ "idUsuario": idUser }).toArray((err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("El usuario no existe");
        client.close();
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
        client.close();
      }
      else {
        col.find({ "nombreParche": nombreParche, "idAdminParche": idUser }).toArray((err, result) => {
          if (err) throw err;
          if (result.length === 0) {
            res.send("No esta autorizado");
            client.close();
          }
          else {
            const obj = result[0];
            const found = obj.integrantes.find(function (element) {
              return element === idUsuario;
            });
            if (typeof (found) === "undefined") {
              obj.integrantes.push(idUsuario);
              col.replaceOne({ "nombreParche": nombreParche, "idAdminParche": idUser }, obj, (err) => {
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
              res.send("El usuario ya está en el parche");
              client.close();
            }
          }
        });
      }
    });
  });
};

const busquedaParche = function (nombreParche, idAdmin, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("parches");
    col.find({ "nombreParche": nombreParche, "idAdminParche": idAdmin }).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
      client.close();
    });
  });
};

const usuariosParche = function (nombreParche, idAdmin, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("parches");
    col.find({ "nombreParche": nombreParche, "idAdminParche": idAdmin }).toArray((err, result) => {
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
        client.close();
      }
      else {
        const arrIntegrantes = [idUser];
        body.idAdminParche = idUser;
        body.integrantes = arrIntegrantes;
        col.insert(body, function (err) {
          if (err) throw err;
          const col2 = db.collection("usuarios");
          col2.find({ "idUsuario": idUser }).toArray((err, result) => {
            if (err) throw err;
            const obj2 = result[0];
            obj2.parches.push({
              "nombreParche": nombreParche,
              "idAdmin": idUser
            })
            col2.replaceOne({ "idUsuario": idUser }, obj2, (err) => {
              if (err) throw err;
              res.send("Parche agregado");
              recalcularLibres(nombreParche, idUser);
              client.close();
            });
          });
        });
      }
    });
  });
}

const registrarUsuario = function (body, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
        client.close();
      }
      else {
        if (body.contrasena !== body.contrasenaConf) {
          res.send("Las contraseñas no coinciden");
          client.close();
        }
        else {
          body.parches = [];
          bcrypt.hash(body.contrasena, 10, function (err, hash) {
            if (err) throw err;
            body.contrasena = hash;
            delete body["contrasenaConf"];
            col.insert(body, function (err) {
              if (err) throw err;
              res.send("Usuario agregado");
              client.close();
            });
          });
        }
      }
    });
  });
}

const borrarParche = function (nombreParche, idUser, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
        client.close();
      }
      else {
        col.find({ "nombreParche": nombreParche, "idAdminParche": idUser }).toArray((err, result) => {
          if (err) throw err;
          if (result.length === 0) {
            res.send("No esta autorizado");
            client.close();
          }
          else {
            const obj = result[0];
            if (obj.integrantes.length >= 2) {
              res.send("El administrador de un parche no puede irse de un parche no vacío");
              client.close();
            }
            else {
              const found = obj.integrantes.find(function (element) {
                return element === idUser;
              });
              if (typeof (found) === "undefined") {
                res.send("El usuario no está en el parche");
                client.close();
              }
              else {
                col.deleteOne({ "nombreParche": nombreParche, "idAdminParche": idUser }, (err) => {
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
        client.close();
      }
      else {
        col.find({ "nombreParche": nombreParche, "idAdminParche": idUser }).toArray((err, result) => {
          if (err) throw err;
          if (result.length === 0) {
            res.send("No esta autorizado");
            client.close();
          }
          else {
            const obj = result[0];
            if (idUsuario === idUser) {
              if (obj.integrantes.length >= 2) {
                res.send("El administrador de un parche no puede irse de un parche no vacío");
                client.close();
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
                client.close();
              }
              else {
                obj.integrantes = obj.integrantes.filter((elemento) => {
                  return (!(elemento === idUsuario))
                });
                col.replaceOne({ "nombreParche": nombreParche, "idAdminParche": idUser }, obj, (err) => {
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

const login = function (body, res, req) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("usuarios");
    console.log(body);
    console.log(body.idUsuario);
    col.find({"idUsuario":body.idUsuario}).toArray((err, resp) => {
      if(resp.length==0){
        res.send("El usuario no existe");
      }
      else{
      if (err) throw err;
      const user = resp[0];
      bcrypt.compare(body.contrasena, user.contrasena, function (err, result) {
        if (result === true) {
          console.log(user);
          req.session.userId = user.idUsuario;
          res.send(user);
        }
        else {
          res.send("Bad user/pass");
        }}
      );}
    });
  });
}

const recalcularLibres = function (nombreParche, idAdmin) {
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("parches");
    const col2 = db.collection("usuarios");
    col.find({ "nombreParche": nombreParche, "idAdminParche": idAdmin }).toArray((err, result) => {
      if (err) throw err;
      let obj = result[0];
      col2.find({ "idUsuario": { $in: obj.integrantes } }).toArray((err, result) => {
        let t = new Array(1008);
        for (let i = 0; i < 1008; ++i) {
          t[i] = [];
        }
        if (err) throw err;
        result.forEach((obj2) => {
          let y = 0;
          obj2.calendario.forEach((ele) => {
            if (ele == 1) {
              t[y].push(obj2.idUsuario);
            }
            y++;
          });
        });
        obj.libres = t;
        col.replaceOne({ "nombreParche": nombreParche, "idAdminParche": idAdmin }, obj, (err) => {
          if (err) throw err;
          client.close();
        });
      });
    });
  });
}

const verLibres = function (nombreParche, idAdmin, hora, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const client = new MongoClient(url);
  client.connect((err) => {
    if (err) throw err;
    const db = client.db("ufree");
    const col = db.collection("parches");
    col.find({ "nombreParche": nombreParche, "idAdminParche": idAdmin }).toArray((err, result) => {
      if (err) throw err;
      if (!(result.length === 0)) {
        const obj = result[0];
        res.send(obj.libres[hora]);
      }
      else {
        res.send("Error: No existe el parche");
      }
      client.close();
    });
  });
}

function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.send("You are not authorized to view this page");
  } else {
    next();
  }
}

module.exports = {
  checkAuth : checkAuth,
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