// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // To handle JSON payloads
app.use(cors()); // For Cross-Origin Resource Sharing

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/healify", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Import the users route
const usersRoute = require("./routes/users");

// Mount the users route
app.use("/users", usersRoute);

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
