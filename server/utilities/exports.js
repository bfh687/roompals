const pool = require("./database");
const cred = require("./password");
const email = require("./email");

const generateHash = cred.generateHash;
const generateSalt = cred.generateSalt;
const sendEmail = email.sendEmail;

module.exports = {
  pool,
  generateHash,
  generateSalt,
  sendEmail,
};
