const mongoose = require("mongoose");
const dotenv = require("dotenv");
const singleBeatCombinations = require("./seedData/singleBeatCombinations");
const flamBeats = require("./seedData/flamBeats");
const StickControlExercise = require("./models/stickControlExerciseModel");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await StickControlExercise.deleteMany();

    const allExercises = [...singleBeatCombinations, ...flamBeats];

    await StickControlExercise.insertMany(allExercises);
    console.log("Seed data imported.");
    process.exit();
  } catch (error) {
    console.error(`Seed data import error: ${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await StickControlExercise.deleteMany();

    console.log("Seed data deleted.");
    process.exit();
  } catch (error) {
    console.error(`Seed data delete error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
