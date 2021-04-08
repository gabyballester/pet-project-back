const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/userModel");

function signUp(req, res) {
  const { email, password, repeatPassword } = req.body;

  // comprobación de campos
  if (!email || !password || !repeatPassword || password !== repeatPassword) {
    return res.status(404).send({ message: "Error de formulario" });
  }

  // encriptación de contraseña
  bcrypt.hash(password, null, null, function (err, hash) {
    if (err) return res.status(500).send({ message: "Error al encriptar la contraseña." });

    // objeto usuario de instancia de usuario para guardar
    const user = new User({
      email: email.toLowerCase(),
      password: hash,
      role: "admin",
      active: false
    });

    //  guardado en mongo
    user.save((err, userStored) => {
      if (err) return res.status(500).send({ message: "Correo ya en uso" });
      if (!userStored) return res.status(404).send({ message: "Error al crear usuario" });
      return res.status(200).send({ user: userStored, message: 'Usuario creado' });
    })

  })
}

function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "Usuario no encontrado" });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Error del servidor" });
          } else if (!check) {
            res.status(401).send({ message: "La contraseña es incorrecta." });
          } else {
            if (!userStored.active) {
              res
                .status(200)
                .send({ code: 402, message: "Usuario no activado" });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored)
              });
            }
          }
        });
      }
    }
  });
}

module.exports = {
  signUp, signIn
}