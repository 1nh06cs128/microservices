const mongoose = require('mongoose');
const { Schema } = mongoose;

const entitlementsSchema = new Schema({
    entitlementName: {
        type: String,
        required: false,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    // Other fields as needed
});

const Entitlements = mongoose.model('Entitlements', entitlementsSchema);

module.exports = Entitlements;
