const express = require("express");
const router = express.Router();

const { pool } = require("../../utilities");

router.post("/", async (req, res) => {
  const { userId, name } = req.body;
  const query = `INSERT INTO party (owner_id, name) VALUES($1, $2) RETURNING *`;

  await pool
    .query(query, [userId, name])
    .then((result) => {
      if (result.rows.length > 0) {
        res.json({
          success: "true",
          message: "Successfully Created Party",
        });
      } else {
        res.status(400).json({
          success: "false",
          message: "Unable to Create Party",
        });
      }
    })
    .catch((err) => console.log(err));
});

router.post("/:id", async (req, res) => {
  const username = req.body.username;
  const query = `SELECT user_id,username,img FROM users WHERE username=$1;`;

  await pool
    .query(query, [username])
    .then((result) => {
      const { user_id, username, img } = result.rows[0];

      const query2 = `INSERT INTO party_members (party_id,user_id) VALUES($1,$2)`;
      pool
        .query(query2, [req.params.id, user_id])
        .then(() => res.json({ userId: user_id, username: username, img: img, verified: 0 }))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/:id", async (req, res) => {
  const query = `SELECT u.user_id, u.name, u.username, u.img, pm.verified
                 FROM users u
                 JOIN party_members pm ON u.user_id = pm.user_id
                 WHERE pm.party_id = $1;`;

  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
