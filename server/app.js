const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log(req.body);
  res.status(200).json({ success: true });
});

app.listen(5000, (req, res) => {
  console.log("Server listening on 5000");
});
