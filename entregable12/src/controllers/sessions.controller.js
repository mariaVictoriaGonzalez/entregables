import config from "../config/config.js";
import { usersService } from "../services/service.js";
import { generateJWToken } from "../utils.js";
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";


export const registerUser = async (req, res) => {
  try {
    console.log("Registrando usuario:");

    res.status(201).send({
      status: "success",
      message: "Usuario creado con éxito con ID.",
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);

    const tokenUser = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role,
    };
    const access_token = generateJWToken(tokenUser);
    console.log(access_token);

    res.cookie("jwtCookieToken", access_token, {
      maxAge: 100000,
      httpOnly: true,
    });
    res.send({ message: "Login success!!" });
  } catch (error) {
    console.error("Error al procesar el inicio de sesión:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const logoutUser = (req, res) => {
  if (req.session.login || req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error al destruir la sesión:", err);
        res
          .status(500)
          .json({ status: "error", message: "Error al cerrar sesión" });
      } else {
        res
          .status(200)
          .json({ status: "success", message: "Sesión cerrada exitosamente" });
      }
    });
  } else {
    res
      .status(400)
      .json({ status: "error", message: "No hay sesión activa para cerrar" });
  }
};

export const githubLogin = async (req, res) => {
  const user = req.user;

  const tokenUser = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
    role: user.role,
  };
  const access_token = generateJWToken(tokenUser);
  console.log(access_token);

  res.cookie("jwtCookieToken", access_token, {
    maxAge: 100000,
    httpOnly: true,
  });
  res.redirect("/api/products");
};

export const renderCambioDePass = async (req, res) => {
  try {
    res.render("ingresodepassnueva", {
      title: "Cambio de contraseña",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const renderModificarPass = async (req, res) => {
  try {
    res.render("maildecambiarPass", {
      title: "Cambio de contraseña",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const mailDeModificarPass = async (req, res) => {
  const email = req.body.email;

  const changePassToken = generateJWToken(email);
  console.log(changePassToken)

  res.cookie("jwtCookieToken", changePassToken, {
    maxAge: 100000,
    httpOnly: true,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: config.gmailAccount,
      pass: config.gmailAppPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to send recovery email.");
    }
  });


  const mailOptions = {
    from: "Coder ecommerce - " + config.gmailAccount,
    to: email,
    subject: "Cambio de Contraseña",
    html: `<h1>Cambio de Contraseña</h1><p>Haga clic en el siguiente enlace para cambiar su contraseña: <a href="http://localhost:8080/api/sessions/cambiodepass">Cambiar Contraseña</a></p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    res.redirect("/api/users/login");

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const cambioDePass = async (req, res) => {
  const { password, confirmPassword } = req.body;
  
  try {
    // Verificar si la contraseña y la confirmación coinciden
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ errorMessage: "Las contraseñas no coinciden." });
    }

    // Extraer el token de la cookie
    const changePassToken = req.cookies.jwtCookieToken;

    // Verificar y decodificar el token
    const modifiedUser = jwt.verify(changePassToken, config.privateKey);

    // Extraer el email del token decodificado
    const userEmail = modifiedUser.user;
    console.log(userEmail)

    // Buscar el usuario en la base de datos por el email
    const user = await usersService.getUserByEmail(userEmail);

    if (!user) {
      return res.status(404).json({ errorMessage: "Usuario no encontrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Actualizar la contraseña del usuario
    user.password = hashedPassword;
    await user.save();

    // Redirigir al usuario después de actualizar la contraseña
    res
      .status(200)
      .redirect("/api/users/login")
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Error interno del servidor." });
  }
};

export const renderProfile = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized: Usuario no autenticado");
    }

    const { name, role, email } = req.user;

    res.render("profile", {
      title: "Perfil",
      name,
      role,
      email,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const changeToPremium = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await usersService.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "premium";

    await usersService.modifyUser(user);

    return res.redirect("/login");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
