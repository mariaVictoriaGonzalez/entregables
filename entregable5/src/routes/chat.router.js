import { Router } from "express";
import chatDao from "../Daos/chat.dao.js";

const router = Router();

router.get("/", (request, response) => {
    response.render("chat", {
        title: "Chat.",
        fileCss: "../css/styles.css"
    });
});

router.post("/", async (request, response) => {
    const { user, message } = request.body;
    const mesg = { user, message };

    try {
        await chatDao.createMessage(mesg);
        response.status(201).json({
            data: {
                message: "Mensaje creado",
            }
        });
    } catch (e) {
        response.status(500).json({
            error: {
                message: e.message,
            }
        });
    }
});

export default (io) => {
    io.on('connection', (socket) => {
        console.log('Usuario conectado');

        socket.on('chat message', (msg) => {
            console.log('Mensaje: ' + msg);
            io.emit('chat message', msg);
        });

        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        });
    });

    return router;
};
