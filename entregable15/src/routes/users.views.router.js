import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/premium/:uid", (req, res) => {
  res.render("isItPremium")
})

router.get("/:uid", (req, res) => {
  res.render("isItPremium")
})

router.get("/:uid/documents", (req, res) => {
  res.render("imageForm")
})

router.post("/:uid/documents", (req, res) => {
})


export default router;
