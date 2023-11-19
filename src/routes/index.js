const router = require("express").Router();

router.use("/alldata", require("./alldata"));
router.use("/meta", require("./meta"));
router.use("/car", require("./car"));
router.use("/racetrack", require("./racetrack"));
router.use("/object", require("./object"));
router.use("/reset", require("./reset"));
router.use("/modification", require("./modification"));
router.use("/route", require("./route"));
router.use("/trajectory", require("./trajectory"));
router.use("/speed", require("./speed"));

module.exports = router;