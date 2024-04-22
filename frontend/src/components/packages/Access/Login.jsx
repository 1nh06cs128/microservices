import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ButtonElement from "../../ui-ux/LabeledButton";
import { loginUser } from '../../../slices/authSlice';
import Username from './childComps/Username';
import Password from './childComps/Password';
import { useAuth } from "../../../hooks/useAuth";

const Login = ({ onLoginSuccess, onClosePopup }) => {
    // const Login = () => {

    const navigate = useNavigate();
    const { loginAuth } = useAuth();

    const loginUsernameRef = useRef(null);
    const loginPasswordRef = useRef(null);

    const [login, setLogin] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        responseError: ''
    });

    const handleInputUpdate = (event) => {
        console.log('handleInputUpdate');
        const { name, value } = event.target;
        setLogin((prev) => ({ ...prev, [name]: value }));
    };

    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    const handleLoginFormSubmit = async (event) => {

        event.preventDefault();
        const usernameError = loginUsernameRef.current.retrieveError();
        const passwordError = loginPasswordRef.current.retrieveError();
        const usernameValue = loginUsernameRef.current.retrieveValue();
        const passwordValue = loginPasswordRef.current.retrieveValue();
        const isFormValid = !(usernameError || passwordError) && Boolean(usernameValue && passwordValue);

        if (!isFormValid) {
            console.log('Oh No, Errors Found!');
            return;
        }

        const userCredentials = {
            username: usernameValue,
            password: passwordValue
        }

        try {
            await loginAuth(userCredentials);

            await dispatch(loginUser(userCredentials)).then((result) => {
                console.log(result);
                if (result.payload) {
                    setLogin({
                        username: '',
                        password: ''
                    })
                    navigate('/todos');
                    onLoginSuccess();
                    onClosePopup();
                }
            });
        } catch (error) {
            console.error(error);
            setErrors(error)
        }
        /*
                const response = await axios.post('http://localhost:8000/user/login', {
                    username: usernameValue,
                    password: passwordValue,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    console.log('User logged in successfully!');
                    console.log('Response from backend:', response.data);
                }).catch(error => {
                    console.error('Error logging user:', error.message);
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
        */
    };

    return (
        <>
            <form onSubmit={handleLoginFormSubmit}>
                {/* {errors && <p className="text-xs text-rose-500">{errors}</p>} */}
                {errors.responseError && <p className="text-xs text-rose-500">{errors.responseError}</p>}
                <Username ref={loginUsernameRef} value={login.username} onChange={handleInputUpdate} characterLimit={32} />
                <Password ref={loginPasswordRef} value={login.password} onChange={handleInputUpdate} characterLimit={32} />
                <ButtonElement
                    className="w-full"
                    label={'Login'}
                    bgColor={'indigo'}
                    type={'submit'}
                />
            </form>
            <div>
                {/* put router link here */}
                <span className="line">
                    <i>Need an Account?</i>{'\u00A0'}  {/* {'\u00A0'} is used for single space in JSX */}
                    <Link className='underline text-blue-700' to='/signup'>Sign Up</Link>
                </span>
            </div>
        </>
    )
}

export default Login