import { Router } from 'express';
import userModel from '../daos/models/user.model.js';

const router = Router();

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    console.log("Registrando usuario:");
    console.log(req.body);

    const exist = await userModel.findOne({ email });
    
    if (exist) {
        return res.status(400).send({ status: 'error', message: "Usuario ya existe!" })
    }

    const user = {
        first_name,
        last_name,
        email,
        password
    }

    const result = await userModel.create(user);
    res.send({ status: "success", message: "Usuario creado con extito con ID: " + result.id });
})

export default router;