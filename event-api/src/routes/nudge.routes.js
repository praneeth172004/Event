const express = require("express");
const upload = require("../middleware/upload.middleware");
const controller = require("../controllers/nudge.controller");

const router = express.Router();

router.post("/nudges", upload.single("image"), controller.createNudge);
router.get("/nudges", controller.getNudgeById);
router.get("/nudges/by-target", controller.getNudgesByTarget);
router.put("/nudges/:id", upload.single("image"), controller.updateNudge);
router.delete("/nudges/:id", controller.deleteNudge);

module.exports = router;
