const express = require("express");
const app = express();

const parser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(parser.json());
app.use(cookieParser());

const cors = require("cors");
app.use(cors());

app.use("/api/auth", require("./routes/auth/register.js"));
app.use("/api/auth", require("./routes/auth/login.js"));
app.use("/api/auth", require("./routes/auth/signout.js"));
app.use("/api/auth", require("./routes/auth/verify.js"));

app.use("/api/party", require("./routes/party/party.js"));
app.use("/api/party/:id/tasks", require("./routes/party/tasks.js"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
