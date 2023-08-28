const router = require("express").Router();

router.use("/roadobjects", require("./roadObjects"));

module.exports = router;