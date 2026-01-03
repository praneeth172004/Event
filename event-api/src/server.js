require("dotenv").config();
const app = require("./app");
const { ConnectDB} = require("./config/db");
const { startNudgeScheduler } = require("./scheduler/nudge.scheduler");
const PORT = process.env.PORT || 3000;

ConnectDB().then(() => {
  startNudgeScheduler();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
