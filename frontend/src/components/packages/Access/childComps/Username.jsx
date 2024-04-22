import React, { useState, forwardRef, useImperativeHandle } from 'react';
import TextInput from "../../../ui-ux/LabeledInput.jsx";
import ValidateUsername from './UsernameValidation.js';

const Username = forwardRef(({
    onChange: onChangeAtLogin,
    characterLimit,
    value,
    syncUsernameAndEmail
}, ref) => {
    const usernameValue = syncUsernameAndEmail ? value : '';
    const [username, setUsername] = useState(usernameValue);
    const [characterCount, setCharacterCount] = useState(value.length);
    const [error, setError] = useState();

    useImperativeHandle(ref, () => ({
        retrieveValue: () => username,
        retrieveError: () => error, // Following imperative return of JS Syntax
    }));

    const handleInputChange = (event) => {
        const usernameValue = event.target.value;
        setUsername(usernameValue);
        const validationError = ValidateUsername(username);
        setError(validationError);
        if (username.length <= characterLimit) {
            setCharacterCount(username.length);
        }
        onChangeAtLogin(event);
    };

    return (
        <div className='relative mb-6'>
            <TextInput
                ref={ref}
                label="Username"
                value={username}
                defaultValue={usernameValue}
                maxLen={characterLimit}
                disabled={syncUsernameAndEmail ? syncUsernameAndEmail : false}
                informParentOnInputChange={handleInputChange}
            />
            <div className="flex justify-between">
                {error && (
                    <span className="flex-1 text-xs text-rose-500 pr-10">{error}</span>
                )}
                {characterLimit && (
                    <span className="flex-1 absolute text-xs text-gray-500 right-0 text-right">
                        {characterCount}/{characterLimit}
                    </span>
                )}
            </div>
        </div>
    );
});

export default Username;
