const router = require("express").Router();

router.use("/alldata", require("./alldata"));
router.use("/meta", require("./meta"));
router.use("/car", require("./car"));
router.use("/racetrack", require("./racetrack"));
router.use("/object", require("./object"));

module.exports = router;