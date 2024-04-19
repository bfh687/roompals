const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

router.post("/verify", async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (!err) {
      res.status(200).send();
    }
  });
});

module.exports = router;
