var mongoose = require("mongoose");
// DEFINING THE SCHEMA
const TaskSchema = new mongoose.Schema({
    id: String,
    task: String,
    createdAt: String,
    updatedAt: String,
    stat: String,
});

// EXPORTING THE MODULE OBJECT
module.exports = mongoose.model("Task", TaskSchema);