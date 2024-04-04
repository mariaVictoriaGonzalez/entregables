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


export default router;
