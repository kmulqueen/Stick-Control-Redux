const router = require("express").Router();
const stickControlExerciseController = require("../../controllers/stickControlExerciseController");

router.route("/:id").get(stickControlExerciseController.getExerciseByID);
router.route("/").get(stickControlExerciseController.getAllExercises);

module.exports = router;
