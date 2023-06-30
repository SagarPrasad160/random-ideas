const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");
connectDB();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send({ message: "Hello from Home" });
});

const ideasRouter = require("./routes/ideas");
app.use("/api/ideas", ideasRouter);

app.listen(PORT, () => console.log("Listening at Port 5000"));
