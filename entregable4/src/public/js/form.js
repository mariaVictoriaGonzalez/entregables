const socket = io();

socketClient.emit("message", "Mensaje desde el formulario");

const button = document.querySelector("#button");