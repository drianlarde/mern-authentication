const express = require("express"); // Import express
const mongoose = require("mongoose"); // Import mongoose
const router = require("./routes/user-routes"); // Import user routes
const cookieParser = require("cookie-parser"); // Import cookie parser
const cors = require("cors"); // Import cors
const app = express(); // Create express app
require("dotenv").config(); // Import dotenv
// app.use(cors()); // Use cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
); // Use cors
app.use(cookieParser()); // Use cookie parser
app.use(express.json()); // Parse JSON data
app.use("/api", router); // Use user routes

mongoose
  .connect("mongodb+srv://admin:Oa0B1hxaKJzb4i0h@cluster0.uhibepm.mongodb.net/auth?retryWrites=true&w=majority")
  .then(() => {
    app.listen(5000); // Start server
    console.log("Database connected! Listening on port 5000");
  })
  .catch((err) => console.log(err)); // Connect to MongoDB
