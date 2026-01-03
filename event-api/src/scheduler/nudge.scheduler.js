const { getDB } = require("../config/db");

const startNudgeScheduler = () => {
  setInterval(async () => {
    const now = new Date();

    const nudges = await getDB()
      .collection("nudges")
      .find({
        status: "scheduled",
        send_at: { $lte: now },
      })
      .toArray();

    for (let nudge of nudges) {
      console.log("Sending nudge:", nudge._id);

      await getDB().collection("nudges").updateOne(
        { _id: nudge._id },
        { $set: { status: "sent" } }
      );
    }
  }, 60000);
};

module.exports = { startNudgeScheduler };
