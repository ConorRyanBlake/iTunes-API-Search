const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Add routes
const searchRoutes = require("./routes/searchRoutes");
const userRoutes = require("./routes/userRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();
const PORT = process.env.PORT || 8080;
const uri =
  "mongodb+srv://conorblakegaming:JK0oZotEzjRpjYLI@hyperiondevtut.szywiyi.mongodb.net/musicAppDB";

// Connect to the database
mongoose.Promise = global.Promise;
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to the database!");
  })
  .catch((err) => {
    console.log("Could not connect to the database...", err);
  });

// Allow app to accept JSON and URL encoded values
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Use the search routes
app.use("/search", searchRoutes);
app.use("/users", userRoutes);
app.use("/favorite", favoriteRoutes);

// Start up express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
