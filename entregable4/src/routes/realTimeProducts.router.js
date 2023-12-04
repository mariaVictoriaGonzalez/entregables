import { Router, request, response } from "express";

const router = Router();

router.get("/", (request, response) => {
    response.render("realTimeProducts", {
        title:"Agregar productos en tiempo real."
    })
})

router.post("/", (request, response) => {
    const formData = request.body;


    response.send("Form submitted successfully!");
});

export default router;
