const express = require("express");
const upload = require("../middleware/upload.middleware");
const {
  createEvent,
  getEventById,
  getLatestEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

const router = express.Router();

router.post("/events", upload.single("image"), createEvent);
router.get("/events", getEventById);


router.get("/events/latest", getLatestEvents);

router.put("/events/:id", upload.single("image"), updateEvent);

router.delete("/events/:id", deleteEvent);
module.exports = router;
