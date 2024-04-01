const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const errMiddleware = require("./middlewares/error");
const cors = require("cors");
//config
dotenv.config();

const app = express();

app.use(
  cors({
    origin: `*`,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());

//*Routes import
// const eventRoute = require("./routes/eventRoute");

// app.use("/api/v1", eventRoute);

//*Middleware for error
app.use(errMiddleware);

module.exports = app;
