const express=require("express");
const eventRoutes = require("./routes/event.routes");
const nudgeRoutes = require("./routes/nudge.routes");
const app=express();
app.use(express.json());
app.use("/uploads",express.static("uploads"));
app.use("/api/v1/app",eventRoutes)
app.use("/api/v3/app", nudgeRoutes);
module.exports = app;