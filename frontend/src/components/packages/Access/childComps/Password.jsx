import React, { useState, forwardRef, useRef, useImperativeHandle } from 'react';
import TextInput from "../../../ui-ux/LabeledInput.jsx";
import ValidatePassword from './PasswordValidation.js';

const Password = forwardRef(({
    defaultValue,
    onChange: onChangeUpdate, // Renamed for clarity (used within ConfirmPassword)
    characterLimit,
    isConfirmPassword = false // New prop to indicate confirm password
}, ref) => {
    const [password, setPassword] = useState(defaultValue);
    const [characterCount, setCharacterCount] = useState(0);
    const [error, setError] = useState();

    const handleInputChange = (event) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);
        if (passwordValue.length <= characterLimit) {
            setCharacterCount(passwordValue.length);
            const validationError = ValidatePassword(passwordValue);
            setError(validationError);
        }

        onChangeUpdate(event); // Pass the event to Parent
    };

    // Optional: Use Imperative Handle to expose password value (if needed)
    useImperativeHandle(ref, () => ({
        retrieveValue: () => password,
        retrieveError: () => error,
    }));

    return (
        <div className='relative mb-6'>
            <TextInput
                ref={ref}
                label={isConfirmPassword ? "Confirm Password" : "Password"}
                inputType='password'
                defaultValue={password} // value is mapped to defaultValue field.
                informParentOnInputChange={handleInputChange}
            />
            <div className="flex justify-between">
                {error && <span className="flex-1 text-xs text-rose-500 pr-10">{error}</span>}
                {characterLimit &&
                    <span className="flex-1 absolute text-xs text-gray-500 right-0 text-right">
                        {characterCount}/{characterLimit}
                    </span>
                }
            </div>
        </div>
    );
});

export default Password;
