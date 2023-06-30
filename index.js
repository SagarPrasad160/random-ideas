const express = require("express");
const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send({ message: "Hello from Home" });
});

app.listen(PORT, () => console.log("Listening at Port 5000"));
