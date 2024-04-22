import React, { useState, forwardRef, useRef } from 'react';
import Password from './Password'; // Import the existing Password component

const withConfirmPassword = (PassedPasswordComponent) => {
    const ConfirmPassword = forwardRef(({ onChange, ...props }, higherOrderRef) => {
        const [confirmPassword, setConfirmPassword] = useState('');
        const [errors, setErrors] = useState({
            confirmPassword: ''
        });
        const passedPasswordRef = useRef(null);
        const handleConfirmPasswordChange = (event) => {
            const confirmPasswordValue = event.target.value;
            const passwordValue = passedPasswordRef.current.retrieveValue();
            console.log(passwordValue, passwordValue.length);
            console.log(confirmPasswordValue, confirmPasswordValue.length);
            setConfirmPassword(confirmPasswordValue);
            if (confirmPasswordValue.length === passwordValue.length && confirmPasswordValue !== passwordValue) {
                setErrors({ confirmPassword: 'Passwords do not match' });
            } else {
                setErrors({ confirmPassword: '' });
            }
            onChange(event);
        };

        return (
            <div>
                <PassedPasswordComponent {...props} ref={passedPasswordRef} onChange={handleConfirmPasswordChange} characterLimit={props.characterLimit} />
                <Password
                    ref={higherOrderRef}
                    {...props} // Pass other props to Password component
                    isConfirmPassword={true}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    characterLimit={props.characterLimit}
                />
                {errors.confirmPassword && (
                    <span className="text-xs text-rose-500">{errors.confirmPassword}</span>
                )}
            </div>
        );
    });

    return ConfirmPassword;
};

const ConfirmPassword = withConfirmPassword(Password);

export default ConfirmPassword;