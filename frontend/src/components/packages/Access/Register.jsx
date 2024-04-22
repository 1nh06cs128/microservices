import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import TextInput from "../../ui-ux/LabeledInput.jsx";
import ButtonElement from "../../ui-ux/LabeledButton.jsx";
import ActionButton from '../../ui-ux/ActionButton.jsx';
import LeftArrowIcon from '../../../assets/svgFiles/leftArrow.svg?react'

import Username from './childComps/Username.jsx';
import ConfirmPassword from './childComps/ConfirmPasswordHOC.jsx';

const Register = () => {

    const registerFirstNameRef = useRef(null);
    const registerMiddleNameRef = useRef(null);
    const registerLastNameRef = useRef(null);
    const registerEmailRef = useRef(null);
    const registerUsernameRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    // const registerPasswordRef = useRef(null);

    const [shouldSyncUsername, setShouldSyncUsername] = useState(Boolean(false));

    const [register, setRegister] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    })

    const [errors, setErrors] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        responseError: ''
    });

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // This will navigate back to the previous page in the history stack
    };

    const handleInputUpdate = (event) => {
        const { name, value } = event.target;
        setRegister((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (event) => {
        const shouldSyncUsername = event.target.checked;
        setShouldSyncUsername(shouldSyncUsername);

        if (shouldSyncUsername) {
            setRegister((prevValues) => ({
                ...prevValues,
                username: register.email,
            }));
        }
    };

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();
        const usernameError = errors && errors['username'] && errors['username'].trim();
        const passwordError = errors && errors['password'] && errors['password'].trim();
        const firstNameValue = register && register['firstName'] && register['firstName'].trim();
        const middleNameValue = register && register['middleName'] && register['middleName'].trim();
        const lastNameValue = register && register['lastName'] && register['lastName'].trim();
        const usernameValue = register && register['username'] && register['username'].trim();
        const passwordValue = register && register['password'] && register['password'].trim();
        const emailValue = register && register['email'] && register['email'].trim();
        const isFormValid = !(usernameError || passwordError) && Boolean(usernameValue && passwordValue && emailValue);
        if (!isFormValid) {
            console.log('Oh No, Errors Found!');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/user/create', {
                firstName: firstNameValue,
                middleName: middleNameValue,
                lastName: lastNameValue,
                email: emailValue,
                username: usernameValue,
                password: passwordValue,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                console.log('User registered successfully!');
                console.log('Response from backend:', response.data);
            }).catch(error => {
                console.error('Error registering user:', error.message);
                // You can access the response data in case of an error as well if it's provided by the server
                if (error.response) {
                    console.error('Response data from backend:', error.response.data.message);
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        responseError: error.response.data.message,
                    }));
                }
            });
        } catch (error) {
            console.error('Error registering user:', error.message);
        }
    };

    return (
        <>
            <ActionButton bgColor="yellow"><LeftArrowIcon onClick={handleGoBack} /></ActionButton>
            {/* <button onClick={handleGoBack}>Go Back</button> */}
            <h1> <strong> SIGN UP WITH US </strong> </h1>
            <form onSubmit={handleLoginFormSubmit}>
                {errors.responseError && <p className='italic text-xs text-rose-500'>{errors.responseError}</p>}
                <div className="flex mb-5">
                    <div className="w-2/4 pr-2">
                        <TextInput
                            ref={registerFirstNameRef}
                            label="First Name"
                            value={register.firstName}
                            informParentOnInputChange={handleInputUpdate}
                        />
                    </div>
                    <div className="w-1/4">
                        <TextInput
                            ref={registerMiddleNameRef}
                            label="Middle Name"
                            value={register.middleName}
                            informParentOnInputChange={handleInputUpdate}
                        /></div>
                    <div className="w-2/4 pl-2">
                        <TextInput
                            ref={registerLastNameRef}
                            label="Last Name"
                            value={register.lastName}
                            informParentOnInputChange={handleInputUpdate}
                        /></div>
                </div>

                <div className="mb-5">
                    <TextInput
                        ref={registerEmailRef}
                        label="Email"
                        value={register.email}
                        informParentOnInputChange={handleInputUpdate}
                    />
                    <div className="flex items-center">
                        <input type="checkbox" id="myCheckbox" className="mr-2 border-gray-300 rounded" value={register.emailIsUsername} onChange={handleCheckboxChange} disabled={!register.email} />
                        <label htmlFor="myCheckbox" className="text-sm italic"> <strong>Select when username should be same as email </strong></label>
                    </div>
                </div>
                <Username ref={registerUsernameRef} value={register.username} syncUsernameAndEmail={shouldSyncUsername} onChange={handleInputUpdate} characterLimit={32} />
                <ConfirmPassword ref={confirmPasswordRef} value={register.password} onChange={handleInputUpdate} characterLimit={32} />
                <ButtonElement
                    className="w-full"
                    label={'Register'.toUpperCase()}
                    bgColor={'indigo'}
                    type={'submit'}
                />
            </form>
        </>
    )
}


export default Register
