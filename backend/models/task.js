const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    // add other fields as needed
});

// Use mongoose.models to avoid OverwriteModelError
module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema);