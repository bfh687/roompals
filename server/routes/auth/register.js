const express = require("express");
const router = express.Router();

const { pool, generateHash, generateSalt } = require("../../utilities");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  const username = name + Math.floor(Math.random() * 9999);

  const salt = generateSalt(32);
  const salted_hash = generateHash(password, salt);

  // TODO: Move this to a util library script
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const query = `INSERT INTO users (name, username, email, password, salt, otp) 
                 VALUES ($1, $2, $3, $4, $5, $6) 
                 ON CONFLICT (email)
                 DO UPDATE SET name = EXCLUDED.name, password = EXCLUDED.password, salt = EXCLUDED.salt, otp = EXCLUDED.otp
                 WHERE users.verified = 0
                 RETURNING *`;
  await pool
    .query(query, [name, username, email, salted_hash, salt, generateOTP()])
    .then((result) => {
      // a verified user already exists for this email
      if (result.rowCount === 0) {
        res.status(400).send({
          success: false,
          message: "Email Already Exists",
        });
        return;
      }

      const user_id = result.rows[0].user_id;
      const token = jwt.sign(
        { user_id: user_id, name: name, username: username, email: email, verified: false },
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
      res.status(400).send({
        success: false,
        message: "User Could Not Be Registered",
      });
    });
});

router.post(
  "/otp",
  (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      res.json({ success: false, message: "No Auth Token" });
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ success: false, message: "Could Not Verify User" });
        return;
      }

      if (decoded.verified) {
        res.status(401).json({ success: false, message: "User Already Verified" });
        return;
      }

      req.user = decoded;
      next();
    });
  },
  async (req, res) => {
    const { otp } = req.body;
    const { email } = req.user;

    const query = `SELECT * FROM users WHERE email=$1`;
    await pool.query(query, [email]).then((result) => {
      if (result.rowCount === 0) {
        res.status(401).json({ success: false, message: "User With Given Email Does Not Exist" });
      } else if (otp != result.rows[0].otp) {
        console.log(otp + " " + result.rows[0].otp);
        res.status(401).json({ success: false, message: "Provided OTP Is Not Valid" });
      } else {
        req.user.verified = true;
        const token = jwt.sign(req.user, process.env.JWT_SECRET);

        res.cookie("token", token, {
          httpOnly: true,
        });

        res.json({ success: true, message: "User Successfully Verified" });
      }
    });
  }
);

module.exports = router;
