const express = require("express");
const router = express.Router();

const { pool } = require("../../utilities");

router.get("/:username", async (req, res) => {
  const query = `SELECT user_id,name,username,img,img2 FROM users WHERE username=$1`;
  await pool
    .query(query, [req.params.username])
    .then((result) => {
      res.status(200).json(result.rows[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", async (req, res) => {
  const { user_id, name, username, img, img2 } = req.body;
  const query = `UPDATE users SET name=$1,username=$2,img=$3,img2=$4 WHERE user_id=$5`;

  await pool
    .query(query, [name, username, img, img2, user_id])
    .then((result) => {
      const success = result.rowCount === 1;
      const message = success ? "Successfully Updated User" : "Failed to Updated User";
      res.status(200).json({ success: success, message: message });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
