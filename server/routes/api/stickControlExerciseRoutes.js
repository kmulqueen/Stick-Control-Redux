const router = require("express").Router();
const stickControlExerciseController = require("../../controllers/stickControlExerciseController");

router.route("/").get(stickControlExerciseController.getAllExercises);

module.exports = router;
