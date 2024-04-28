const express = require("express");
const router = express.Router();

const { pool, generateHash } = require("../../utilities");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  console.log("her");
  if (!req.headers.authorization) {
    res.status(401).json({
      success: false,
      message: "Missing Authorization Header",
    });
    return;
  }

  const base64Credentials = req.headers.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [email, password] = credentials.split(":");

  const query = `SELECT user_id, name, username, img, email, password, salt, verified from users where email=$1`;
  const values = [email];

  pool
    .query(query, values)
    .then((result) => {
      if (result.rowCount == 0) {
        res.status(404).send({
          success: false,
          message: "User Not Found",
        });
        return;
      }

      if (result.rows[0].verified == 0) {
        res.status(401).send({
          success: false,
          message: "Email Not Verified",
        });
        return;
      }

      // get salt, hashed password, and compute expected hashed password
      const salt = result.rows[0].salt;
      const salted_hash = result.rows[0].password;
      const expected_hash = generateHash(password, salt);

      // compare hashed passwords
      if (salted_hash === expected_hash) {
        const token = jwt.sign(
          {
            user_id: result.rows[0].user_id,
            name: result.rows[0].name,
            username: result.rows[0].username,
            email: email,
            img: result.rows[0].img,
          },
          process.env.JWT_SECRET
        );

        res.cookie("token", token, {
          httpOnly: true,
        });

        res.status(201).send({
          success: true,
          user: {
            name: result.rows[0].name,
            username: result.rows[0].username,
            img: result.rows[0].img,
          },
          message: "Authentication Successful",
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Credentials Did Not Match",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        success: false,
        message: err.detail,
      });
    });
});

module.exports = router;
