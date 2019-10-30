const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const { createUser } = require("./lib/signin");

app.use(express.static("public"));

app.post("/signin", (req, res) => {
  createUser(req.body)
    .then(user => {
      res.status(user.statusCode).json(user.body);
    })
    .catch(err => {
      res.status(err.statusCode).json(err.body);
    });
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.listen(3001);
