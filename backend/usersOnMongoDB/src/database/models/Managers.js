const mongoose = require('mongoose');
const { Schema } = mongoose;

const managerSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    // Other fields as needed
});

const Managers = mongoose.model('Managers', managerSchema);

module.exports = Managers;
