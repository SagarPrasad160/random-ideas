const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const connectDB = require("./config/db");
connectDB();

// static folder
app.use(express.static(path.join(__dirname, "public")));
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
if (process.env.NODE_ENV !== "production") {
  const cors = require("cors");
  app.use(
    cors({
      origin: ["http://localhost:5000", "http://localhost:3000"],
      credentials: true,
    })
  );
}
app.get("/", (req, res) => {
  res.send({ message: "Hello from Home" });
});

const ideasRouter = require("./routes/ideas");
app.use("/api/ideas", ideasRouter);

app.listen(PORT, () => console.log("Listening at Port 5000"));
