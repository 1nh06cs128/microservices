const mongoose = require('mongoose');
const { Schema } = mongoose;

const rolesSchema = new Schema({
    roleName: {
        type: String,
        required: false,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    permissions: {
        type: [String],
        required: false
    }
});

const Roles = mongoose.model('Roles', rolesSchema);

module.exports = Roles;
