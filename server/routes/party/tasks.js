const express = require("express");
const router = express.Router();

const { pool } = require("../../utilities");

router.post("/", async (req, res) => {
  const { partyId, content, type } = req.body;
  const query = `INSERT INTO tasks (party_id, type, content) VALUES ($1, $2, $3) RETURNING task_id`;

  await pool
    .query(query, [partyId, type, content])
    .then((result) => {
      const id = result.rows[0].task_id;
      res.status(200).send({
        success: true,
        message: "Task Successfully Added",
        id: id,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/", async (req, res) => {
  // TODO: Update Tasks
});

router.get("/:type", async (req, res) => {
  const query = `SELECT * FROM tasks WHERE type=$1 AND party_id=$2 ORDER BY task_id DESC`;

  await pool
    .query(query, [+req.params.type, 1])
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:taskId", async (req, res) => {
  const query = `DELETE FROM tasks where task_id=$1`;

  await pool
    .query(query, [req.params.taskId])
    .then(() => {
      res.status(200).send({
        success: true,
        message: "Task Successfully Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
