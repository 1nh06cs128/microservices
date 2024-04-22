const mongoose = require('mongoose');
const { Schema } = mongoose;

const AttributeMetadataSchema = new Schema({
    unique_reference_code: '', // should be mapped with external documentations
    app_reference: {
        attribute_id: '', // Unique code which can be used at APP Level for Automation or any other activity on UI.
        attribute_key: '',
        attribute_desc: '',
    },
    base_config: {
        value: '',
        col_mapping: '',
        is_mandatory: '',
        is_visible: '',
        is_read_only: '',
        sequence: '',
        customization_allowed: '', //custom_config should be allowed to edit only when this is set to True or 'Y'
    },
    custom_config: {
        value: '',
        col_mapping: '',
        is_mandatory: '',
        is_visible: '',
        is_read_only: '',
        sequence: ''
    },
    release_info: {
        intro_date: '',
        req_code: '',
        req_desc: '',
        enhancements: [{
            req_code: '',
            req_desc: '',
            update_on: '',
            updated_by: ''
        }]
    },
    db_creation_date: '',
    manual: {
        db_operation_date: '',
        last_updated_on: '',
        last_updated_by: '',
    }
});

const AttributeMetadata = mongoose.model('AttributeMetadata', AttributeMetadataSchema);

module.exports = AttributeMetadata;
