function ValidatePassword(value) {
    const errors = {};

    const validateBy = {
        password: {
            length: {
                // Minimum length of 8, maximum of 72
                pattern: /^.{8,32}$/,
                message: "be 8-32 characters long"
            },
            uppercase: {
                pattern: /[A-Z]/,
                message: "contain at least one uppercase letter"
            },
            lowercase: {
                pattern: /[a-z]/,
                message: "contain at least one lowercase letter"
            },
            // Include digits and special characters (configurable)
            digit: {
                pattern: /\d/,
                message: "contain at least one digit",
                optional: true // Make this optional by default
            },
            specialChar: {
                pattern: /[!@#$%^&*()_+\-{}\[\]:;<>,.?~\\/-]/,
                message: "contain at least one special character",
                optional: true // Make this optional by default
            }
        }
    };

    const validatePassword = (password) => {
        const passwordErrors = [];
        // Iterate over keys and values (destructuring) in pattern.password
        // check refers to Keys & regex refers to values in pattern.password
        for (const [check, regex] of Object.entries(validateBy.password)) {
            // console.log(check);
            // console.log(regex);
            if (!(regex.pattern).test(password)) {
                passwordErrors.push(validateBy.password[check].message); // Use pre-defined error message
            }
        }

        errors.password =
            `${errors.password ? errors.password : ''}`
            +
            `${passwordErrors.length
                ? ` 'password' must ${passwordErrors.length > 1
                    ? ` ${passwordErrors
                        .slice(0, -1)
                        .join(', ')} and ${passwordErrors.slice(-1)}`
                    : ` ${passwordErrors.slice(-1)}`
                }`
                : ''
            }`;

    };

    const validateField = (field, value) => {

        if (!value.trim()) {
            errors[field] = `'${field}' not provided.`;
            return; // Early exit if field is empty to avoid unnecessary checks
        }

        const validation = validateBy[field]; // Reference the field's validation object

        if (!validation) {
            console.error(`"${field}" validation rules not found in validateBy object.`);
            return; // Or handle the situation as needed
        }

        validatePassword(value);
    };

    validateField('password', value);

    const errorMessage = Object.values(errors).filter(Boolean).join(' ');

    return errorMessage;
}

export default ValidatePassword;
