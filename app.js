const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const { createUser } = require("./lib/signin");

app.use(express.static("public"));

app.post("/signin", async (req, res) => {
  try {
    let user = await createUser(req.body);
    res.status(user.statusCode).json(user.body);
  } catch (error) {
    res.status(500).send("we are bad at code sorry ...");
  }
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.listen(3001);
