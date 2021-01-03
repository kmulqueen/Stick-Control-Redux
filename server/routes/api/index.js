const router = require("express").Router();
const testRoutes = require("./testRoutes");
const stickControlExerciseRoutes = require("./stickControlExerciseRoutes");

router.use("/test", testRoutes);
router.use("/sc-exercises", stickControlExerciseRoutes);

module.exports = router;
