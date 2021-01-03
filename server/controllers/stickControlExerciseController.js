const StickControlExercise = require("../models/stickControlExerciseModel");

const Exercise = require("../models/index").StickControlExercise;

module.exports = {
  getAllExercises: async function (req, res) {
    try {
      const exercises = await Exercise.find();
      res.json(exercises);
    } catch (error) {
      res.status(422).json(error);
    }
  },
};
