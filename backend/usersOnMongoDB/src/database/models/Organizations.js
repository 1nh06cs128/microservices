const mongoose = require('mongoose');
const { Schema } = mongoose;

const organizationsSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    // Other fields as needed
});

const Organizations = mongoose.model('Organizations', organizationsSchema);

module.exports = Organizations;
