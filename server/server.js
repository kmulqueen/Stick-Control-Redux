const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const routes = require("./routes");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(routes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  )
);
