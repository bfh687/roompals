const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { pool } = require("../../utilities");

router.get(
  "/verify",
  async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      res.json({ success: false, message: "No Auth Token" });
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || !decoded.verified) {
        res
          .status(401)
          .json({ success: false, message: "Could Not Verify User" });
        return;
      }

      req.user = decoded;
      delete req.user.iat;
      next();
    });
  },
  (req, res, next) => {
    const query =
      "SELECT user_id,name,username,email,img,verified FROM users WHERE user_id=$1";
    pool
      .query(query, [req.user.user_id])
      .then((result) => {
        const user1 = JSON.stringify(req.user);
        const user2 = JSON.stringify(result.rows[0]);

        // update token if user updated their info
        if (user1 !== user2) {
          const token = jwt.sign(result.rows[0], process.env.JWT_SECRET);
          res.cookie("token", token, {
            httpOnly: true,
          });
        }

        req.user = result.rows[0];
        next();
      })
      .catch((err) => console.log(err));
  },
  (req, res) => {
    const query = `SELECT * FROM party WHERE party.id IN 
                  (SELECT party_id FROM party_members WHERE user_id=$1 AND verified=0)`;
    pool
      .query(query, [req.user.user_id])
      .then((result) => {
        req.user.notifications = result.rows;
        res.json({ success: true, user: req.user });
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
