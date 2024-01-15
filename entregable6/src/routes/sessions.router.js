import { Router } from "express";
import { userModel } from "../daos/models/user.model.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  console.log("Registrando usuario:");
  console.log(req.body);

  const exist = await userModel.findOne({ email });

  if (exist) {
    return res
      .status(400)
      .send({ status: "error", message: "Usuario ya existe!" });
  }

  const user = {
    first_name,
    last_name,
    email,
    password,
  };

  const result = await userModel.create(user);
  res.send({
    status: "success",
    message: "Usuario creado con extito con ID: " + result.id,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password });

  if (!user)
    return res
      .status(401)
      .send({ status: "error", error: "Incorrect credentials" });

  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
  };

  res.send({
    status: "success",
    payload: req.session.user,
    message: "¡Primer logueo realizado! :)",
  });
  
});

export default router;
