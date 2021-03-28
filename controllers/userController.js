const bcrypt = require("bcrypt-nodejs");
const User = require("../models/userModel");

function signUp(req, res) {



  const { email, password, repeatPassword } = req.body;


  // comprobación de campos
  if (!email || !password || !repeatPassword || password !== repeatPassword ) {
    return res.status(404).send({ message: "Error de formulario" });
  }

  // encriptación de contraseña
  bcrypt.hash(password, null, null, function (err, hash) {
    if (err) return res.status(500).send({ message: "Error al encriptar la contraseña." });
    
    // objeto usuario de instancia de usuario para guardar
    const user = new User({
      email,
      password: hash,
      role: "admin",
      active: false
    });
    
    //  guardado en mongo
    user.save((err, userStored) => {
      if (err) return res.status(500).send({ message: "El usuario ya existe." });
      if (!userStored) return res.status(404).send({ message: "Error al crear el usuario." });
      return res.status(200).send({ user: userStored });
    })

  })
}

module.exports = {
  signUp
}