const router = require("express").Router();
const { test } = require("../../controllers/testController");

router.route("/").get(test);

module.exports = router;
