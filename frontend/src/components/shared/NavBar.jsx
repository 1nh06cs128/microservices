import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import Todo from "../packages/Todo/Todo";
import ButtonElement from '../ui-ux/LabeledButton'
import PopUpLayout from '../ui-ux/PopUpLayout'

import Login from '../packages/Access/Login';

function getUser() {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

const NavBar = () => {
    const [user, setUser] = useState(getUser());

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleLoginSuccess = () => {
        setUser(getUser());
    };
    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    const handleLoginButtonClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    {/* <Link className='underline text-blue-700' to='/signup'>Sign Up</Link> */}
                    <Link to="/logo" className="text-white text-lg font-bold">Logo</Link>
                </div>
                <div className="flex space-x-4 items-center">
                    <Link to="/home" className="text-gray-300 hover:text-white">Home</Link>
                    <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
                    <Link to="/services" className="text-gray-300 hover:text-white">Services</Link>
                    <Link to="/contacts" className="text-gray-300 hover:text-white">Contacts</Link>
                    <>{user
                        ?
                        <>
                            <ButtonElement
                                className="w-full mt-0"
                                label={'Logout'.toUpperCase()}
                                bgColor={'indigo'}
                                type={'submit'}
                                handleButtonClickOnParent={handleLogout}
                            />
                            {/* <Todo /> */}
                        </>
                        :
                        <>
                            <PopUpLayout buttonLabel={'Login'.toUpperCase()} className={'mt-0'} isOpen={isPopupOpen} onClose={handleClosePopup}>
                                {/* <Login /> */}
                                <Login onLoginSuccess={handleLoginSuccess} onClosePopup={handleClosePopup} />
                            </PopUpLayout>
                            {/* <Link to="/login" className="italics text-rose-500">LOGIN</Link> */}
                        </>
                    }
                    </>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
