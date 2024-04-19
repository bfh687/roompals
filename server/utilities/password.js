const crypto = require("crypto");

const generateHash = (pw, salt) =>
  crypto
    .createHash("sha256")
    .update(pw + salt)
    .digest("hex");

const generateSalt = (size) => crypto.randomBytes(size).toString("hex");

module.exports = {
  generateHash,
  generateSalt,
};
