const mongoose = require('mongoose');
// const { Logger } = require('../../utils/customLogger');
const { AppLogger, CallPointInfo } = require('../../../../../others/advanceLog');

const bcrypt = require('bcrypt');

const Roles = require('./Roles');
const Entitlements = require('./Entitlements');
const Manager = require('./Managers');
const Organizations = require('./Organizations');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        default: 'John',
        required: true,
        validate: {
            validator: function (value) {
                // OWASP: Avoiding Injection Attacks - Validate input
                return /^[a-zA-Z.]+$/.test(value);
            },
            message: props => `${props.value} is not a valid first name!`
        }
    },
    middleName: {
        type: String,
        default: 'Doe',
        required: false,
        validate: {
            validator: function (value) {
                if (!value) return true; // No Middle Name holds Good.
                // OWASP: Avoiding Injection Attacks - Validate input
                return /^[a-zA-Z.]+$/.test(value);
            },
            message: props => `${props.value} is not a valid middle name!`
        }
    },
    lastName: {
        type: String,
        default: 'Doe',
        required: true,
        validate: {
            validator: function (value) {
                // OWASP: Avoiding Injection Attacks - Validate input
                return /^[a-zA-Z.]+$/.test(value);
            },
            message: props => `${props.value} is not a valid last name!`
        }
    },
    email: {
        type: String,
        default: 'example@example.com',
        required: true,
        validate: {
            validator: function (value) {
                // OWASP: Input Validation - Validate email format
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    username: {
        type: String,
        default: 'john_doe',
        required: true,
        validate: {
            validator: function (value) {
                // OWASP: Avoiding Injection Attacks - Validate input
                // OWASP: Authentication - Use strong username (not specifically OWASP, but a good practice)
                return /^[\w.%+-]+(?:@[\w-]+\.)+[a-zA-Z]{2,}$|^[\w.%+-]+$|^[\w.%+-]+\.[\w.%+-]+$/.test(value) && value.length >= 8;
            },
            message: props => `${props.value} is not a valid username!`
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            },
            message: props => `${props.value} is not an acceptable Password, Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.`
        }
    },
    roles: {
        type: Schema.Types.ObjectId,
        ref: 'Roles' // Reference to Roles schema
    },
    entitlements: [{
        type: Schema.Types.ObjectId,
        ref: 'Entitlements' // Reference to Entitlements schema
    }],
    managers: {
        type: Schema.Types.ObjectId,
        ref: 'Managers' // Reference to Manager schema
    },
    organizations: {
        type: Schema.Types.ObjectId,
        ref: 'Organizations' // Reference to Manager schema
    }
});

// Pre hook to log validation errors
UserSchema.pre('validate', function (next) {
    AppLogger.emit('debug', 'In Validate Pre Hook', CallPointInfo());
    const validationErrors = this.validateSync();
    if (validationErrors) {
        const errors = {
            type: "Model Schema Validation Error Occurred",
            status: 400,
            ok: false,
            error: Object.values(validationErrors.errors).map(err => ({
                field: err.path,
                message: err.message
            }))
        };
        Logger.error('Calling Next with Errors!');
        return next(errors);
    } else {
        AppLogger.emit('debug', 'No Validation Errors!', CallPointInfo());
    }
    next();
});

// Hash password before saving but after Model Validations
UserSchema.pre('save', async function (next) {
    AppLogger.emit('debug', 'In Save Pre Hook', CallPointInfo());
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});


// Post hook to log save errors
UserSchema.post('save', function (error, doc, next) {
    AppLogger.emit('debug', 'In Save Post Hook', CallPointInfo());
    if (error) {
        AppLogger.emit('error', `Error Present, calling Next! ${error}`, CallPointInfo());
        return next(error);
    } else {
        AppLogger.emit('debug', 'All Good till Save, calling Next!', CallPointInfo());
    }
    next();
});

module.exports = mongoose.model('users', UserSchema);