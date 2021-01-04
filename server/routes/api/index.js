const router = require("express").Router();
const stickControlExerciseRoutes = require("./stickControlExerciseRoutes");

router.use("/sc-exercises", stickControlExerciseRoutes);

module.exports = router;
