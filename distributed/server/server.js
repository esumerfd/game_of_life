const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/api/beacon", function (req, res) {
  res.send(
      `__________
       __________
       __xx______
       __x_______
       _____x____
       ____xx____
       __________
       __________
       __________
       __________`);
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
