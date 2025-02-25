const express = require("express");
const app = express();
const urlRoutes = require("./routes/url");
// const errorHandler = require("./utils/errorHandler");

app.use(express.json());

// API routes
app.use("/api", urlRoutes);

// Global error handler
// app.use(errorHandler);

module.exports = app;
