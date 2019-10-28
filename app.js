const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/signup", (req, res) => {
  res.json({ ok: true });
});

app.get("/login", (req, res) => {
  //   res.json({ ok: true });
  res.send(
    `
    <form action="http://localhost:5984/_session?next=http://localhost:3001/" method="post"> <input type="text" name="name"/> <input type="password" name="password"/> <input type="hidden" name="next" value="http://localhost:3001/"> <button type="submit">login</button></html>
    `
  );
});

app.listen(3001);
