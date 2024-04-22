function ValidateUsername(value) {
    const errors = {};

    const validateBy = {
        username: {
            // Allow alphanumeric characters, underscores, or email format
            pattern: /^[a-zA-Z0-9_.]{8,32}$|^([^\s@]+@[^\s@]+\.[^\s@]{2,})$/,
            message: "'Username' can be an unique ID of minimum 8 characters or be a valid email address, both have a maximum limit of 32 characters",
        },
    };

    const titleCase = (str) => {
        return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        });
    };

    const validateField = (field, value) => {
        if (!value.trim()) {
            errors[field] = `'${titleCase(field)}' not provided.`;
            return; // Early exit if field is empty to avoid unnecessary checks
        }

        const validation = validateBy[field]; // Reference the field's validation object

        if (!validation) {
            console.error(`"${titleCase(field)}" validation rules not found in validateBy object.`);
            return; // Or handle the situation as needed
        }

        const { pattern, message } = validation; // Destructure pattern and message
        if (!pattern.test(value)) {
            errors[field] = message; // Use pre-defined error message
        }
    };

    validateField('username', value);

    // Convert errors to a string message
    const errorMessage = Object.values(errors).filter(Boolean).join(' ');

    return errorMessage;
}

export default ValidateUsername;
