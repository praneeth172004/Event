const { getDB } = require("../config/db");
const { ObjectId, isValidObjectId } = require("../utils/objectId.util");


const createNudge = async (req, res) => {
  const db = getDB();

  const {
    target_type,
    target_id,
    title,
    description,
    schedule_date,
    schedule_from,
    icon,
    invitation_text,
  } = req.body;

  const sendAt = new Date(`${schedule_date}T${schedule_from}:00`);

  const nudge = {
    type: "nudge",
    uid: 18,
    target_type,
    target_id: new ObjectId(target_id),
    title,
    description,
    icon,
    invitation_text,
    image: req.file?.path || null,
    send_at: sendAt,
    status: "scheduled",
    createdAt: new Date(),
  };

  const result = await db.collection("nudges").insertOne(nudge);

  res.status(201).json({
    message: "Nudge created",
    nudgeId: result.insertedId,
  });
};


const getNudgeById = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "Invalid id" });

  const nudge = await getDB()
    .collection("nudges")
    .findOne({ _id: new ObjectId(id) });

  if (!nudge)
    return res.status(404).json({ message: "Nudge not found" });

  res.json(nudge);
};


const getNudgesByTarget = async (req, res) => {
  const { target_id } = req.query;
  console.log(target_id);
  
   if (!isValidObjectId(target_id)) {
    return res.status(400).json({ message: "Invalid target_id" });
  }

  const nudges = await getDB()
    .collection("nudges")
    .find({ target_id: new ObjectId(target_id) })
    .toArray();

  res.json({ count: nudges.length, nudges });
};


const updateNudge = async (req, res) => {
  const { id } = req.params;

  const updates = { ...req.body };
  if (req.file) updates.image = req.file.path;

  await getDB()
    .collection("nudges")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

  res.json({ message: "Nudge updated" });
};

const deleteNudge = async (req, res) => {
  const { id } = req.params;

  await getDB()
    .collection("nudges")
    .deleteOne({ _id: new ObjectId(id) });

  res.json({ message: "Nudge deleted" });
};

module.exports = {
  createNudge,
  getNudgeById,
  getNudgesByTarget,
  updateNudge,
  deleteNudge,
};
