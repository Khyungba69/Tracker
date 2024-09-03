import express from "express";

const router = express.Router();

router.post("/user/register", (req, res) => {
  const user = { name: "Nabin" };
  res.send(user);
});

export default router;
