import ChatService from "../services/dao/chat.dao.js";
import { Router } from "express";
import { createMessage, renderChat } from "../controllers/chat.controller.js";

const router = Router();
const chatService = new ChatService();

router.get("/", renderChat);

router.post("/", createMessage);

export default (io) => {
  io.on("connection", (socket) => {
    console.log("Usuario conectado");

    socket.on("chat message", async (data) => {
      console.log(`Mensaje: ${data.message} - Usuario: ${data.user}`);

      try {
        await chatService.createMessage({
          user: data.user,
          message: data.message,
        });
      } catch (error) {
        console.error(
          "Error al guardar el mensaje en la base de datos:",
          error
        );
      }

      io.emit("chat message", data);
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });
  });

  return router;
};
