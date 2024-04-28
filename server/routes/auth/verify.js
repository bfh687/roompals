const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { pool } = require("../../utilities");

router.get(
  "/verify",
  async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      res.json({ success: false, message: "No Auth Token" }).send();
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).send();
        return;
      }

      req.user = decoded;
      delete req.user.iat;
      next();
    });
  },
  (req, res) => {
    const query =
      "SELECT user_id,name,username,email,img FROM users WHERE user_id=$1";
    pool
      .query(query, [req.user.user_id])
      .then((result) => {
        const user1 = JSON.stringify(req.user);
        const user2 = JSON.stringify(result.rows[0]);

        // update token if user updated their info
        if (user1 !== user2) {
          const token = jwt.sign(user2, process.env.JWT_SECRET);
          res.cookie("token", token, {
            httpOnly: true,
          });
        }

        res.json({ user: result.rows[0] });
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
