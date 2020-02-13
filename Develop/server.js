const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public")); 

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// app.use(require("./public/api"));

app.get("/exercise", function(req, res){
    res.sendFile(path.join(__dirname, "/public/exercise.html"))
});

app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
  });
  