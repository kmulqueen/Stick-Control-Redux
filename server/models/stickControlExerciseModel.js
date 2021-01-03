const mongoose = require("mongoose");

const stickControlExerciseSchema = mongoose.Schema({
  section: { type: String, required: true },
  exercise: { type: Number, required: true },
  sticking: { type: String, required: true },
  count: { type: String, required: true },
  class: { type: String, required: true },
  measure1: {
    exercise: { type: Number, required: true },
    sticking: { type: String, required: true },
    grid: { type: String, required: true },
    count: { type: String, required: true },
    lead: { type: String, required: true },
    timeSignature: { type: String, required: true },
    inverted: { type: Boolean, required: true },
  },
  measure2: {
    exercise: { type: Number, required: true },
    sticking: { type: String, required: true },
    grid: { type: String, required: true },
    count: { type: String, required: true },
    lead: { type: String, required: true },
    timeSignature: { type: String, required: true },
    inverted: { type: Boolean, required: true },
  },
  inverted: { type: Boolean, required: true },
});

const StickControlExercise = mongoose.model(
  "StickControlExercise",
  stickControlExerciseSchema
);
module.exports = StickControlExercise;
