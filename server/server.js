const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(routes);
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  )
);
