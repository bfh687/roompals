const express = require("express");
const router = express.Router();

router.post("/logout", async (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.status(200).send("Logged Out Successfully");
});

module.exports = router;
