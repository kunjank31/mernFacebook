const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const router = require("./routes/api_router");
require("dotenv").config();
const port = process.env.PORT || 7000;
// database connection
require("./db/db");
// JSON
app.use("/upload", express.static("upload"));
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use("/api", router);

// Error Handler Middleware
app.use(require("./middlewares/errorHandler"));

// Server
app.listen(port, () => {
  console.log("Server is running at " + port);
});
