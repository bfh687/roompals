const express = require("express");
const router = express.Router();

const { pool } = require("../../utilities");

const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        success: "false",
        message: err,
      });
      return;
    }

    const query = `SELECT DISTINCT party_id FROM party_members WHERE user_id=$1`;

    pool
      .query(query, [decoded.id])
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  });
});

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
      if (result.rows.length === 0) {
        res.json({ success: true });
        return;
      }
      const { user_id, username, img } = result.rows[0];

      const query2 = `INSERT INTO party_members (party_id,user_id) VALUES($1,$2)`;
      pool
        .query(query2, [req.params.id, user_id])
        .then(() => res.json({ user_id: user_id, username: username, img: img, verified: 0 }))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/:id", async (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      const query = `SELECT u.user_id, u.name, u.username, u.img, u.level, u.xp, u.health, pm.verified
                     FROM users u
                     JOIN party_members pm ON u.user_id = pm.user_id
                     WHERE pm.party_id = $1
                     ORDER BY CASE WHEN u.user_id=$2 THEN 0 ELSE 1 END;`;

      pool
        .query(query, [req.params.id, decoded.user_id])
        .then((result) => {
          res.json(result.rows);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

router.delete("/:partyId/members/:memberId", async (req, res) => {
  const query = `DELETE FROM party_members WHERE party_id=$1 AND user_id=$2;`;

  pool
    .query(query, [req.params.partyId, req.params.memberId])
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/:partyId/members/:memberId", async (req, res) => {
  const query = `UPDATE party_members SET verified=1 WHERE party_id=$1 AND user_id=$2`;

  pool
    .query(query, [req.params.partyId, req.params.memberId])
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
