const pool = require("./database");
const cred = require("./password");
const generateHash = cred.generateHash;
const generateSalt = cred.generateSalt;

module.exports = {
  pool,
  generateHash,
  generateSalt,
};
