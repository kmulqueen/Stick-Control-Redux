const StickControlExercise = require("../models/stickControlExerciseModel");

const Exercise = require("../models/index").StickControlExercise;

module.exports = {
  getAllExercises: async function (req, res) {
    try {
      const exercises = await Exercise.find();

      if (exercises.length) {
        res.json(exercises);
      } else {
        res.status(404).json({ msg: "No exercises found" });
      }
    } catch (error) {
      res.status(422).json(error);
    }
  },
  getExerciseByID: async function (req, res) {
    try {
      const exercise = await Exercise.findById(req.params.id);

      if (exercise) {
        res.json(exercise);
      } else {
        res.status(404).json({ msg: "Exercise not found." });
      }
    } catch (error) {
      res.status(422).json(error);
    }
  },
  getRandomExercise: async function (req, res) {
    try {
      const exercises = await Exercise.find();
      const randomIndex = Math.floor(Math.random() * exercises.length);
      const randomExercise = exercises[randomIndex];

      res.json(randomExercise);
    } catch (error) {
      res.status(422).json(error);
    }
  },
};
