const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fitnessSchema = new Schema({
    //schema goes here
});

const Fitness = mongoose.model("Fitness", fitnessSchema);

module.exports = Fitness;