const express = require("express");
const router = express.Router();

const { pool, generateHash, generateSalt } = require("../../utilities");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  const username = name + Math.floor(Math.random() * 9999);

  const salt = generateSalt(32);
  const salted_hash = generateHash(password, salt);

  const query = `INSERT INTO users (name, username, email, password, salt) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  await pool
    .query(query, [name, username, email, salted_hash, salt])
    .then((result) => {
      const id = result.rows[0].user_id;
      const token = jwt.sign(
        { id: id, name: name, username: username, email: email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7 days",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
      });

      res.status(200).send({
        success: true,
        message: "User Registered Successfully!",
      });
    })
    .catch((err) => {
      const constraint = err.constraint;
      console.log(err);
      if (constraint == "user_email_key") {
        res.status(400).send({
          success: false,
          message: "Email Already Exists",
        });
      } else if (constraint == "user_username_key") {
        res.status(400).send({
          success: false,
          message: "Username Already Exists",
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Unable to Register User",
        });
      }
    });
});

module.exports = router;
