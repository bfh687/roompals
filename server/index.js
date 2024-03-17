const express = require("express");
const parser = require("body-parser");
const app = express();

app.use(parser.json());

const cors = require("cors");
app.use(cors());

const pool = require("./database");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
