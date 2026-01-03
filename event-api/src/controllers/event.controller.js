const { getDB } = require("../config/db");
const { ObjectId, isValidObjectId } = require("../utils/objectId.util");
const createEvent = async (req, res) => {
  try {
    const db = getDB();
    const eventsCollection = db.collection("events");

    const {
      name,
      tagline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
    } = req.body;

    const event = {
      type: "event",
      uid: 18,
      name,
      tagline,
      schedule: new Date(schedule),
      description,
      moderator,
      category,
      sub_category,
      rigor_rank: Number(rigor_rank),
      attendees: [],
      image: req.file ? req.file.path : null,
      createdAt: new Date(),
    };

    const result = await eventsCollection.insertOne(event);

    return res.status(201).json({
      message: "Event created successfully",
      eventId: result.insertedId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid event id" });
    }

    const db = getDB();
    const event = await db
      .collection("events")
      .findOne({ _id: new ObjectId(id) });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getLatestEvents = async (req, res) => {
  try {
    let { limit = 5, page = 1 } = req.query;

    limit = Number(limit);
    page = Number(page);

    const skip = (page - 1) * limit;

    const db = getDB();
    const events = await db
      .collection("events")
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    res.status(200).json({
      page,
      limit,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid event id" });
    }

    const updates = { ...req.body };


    if (req.file) {
      updates.image = req.file.path;
    }

   
    if (updates.schedule) {
      updates.schedule = new Date(updates.schedule);
    }
    if (updates.rigor_rank) {
      updates.rigor_rank = Number(updates.rigor_rank);
    }

    const db = getDB();
    const result = await db.collection("events").updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid event id" });
    }

    const db = getDB();
    const result = await db
      .collection("events")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createEvent,getEventById,
  getLatestEvents,updateEvent,deleteEvent };
