import React, { useState } from 'react';

import ButtonElement from './LabeledButton';
import ActionButton from './ActionButton';

import CancelIcon from '../../assets/svgFiles/cancel.svg?react';

function PopUpLayout({ buttonLabel, children }) {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="relative">
            {/* Button to toggle the pop-up */}
            <ButtonElement
                handleButtonClickOnParent={togglePopup}
                className="bg-blue-500 text-white rounded mt-0"
                type="button"
                label={buttonLabel}
            />

            {/* Popup content */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
                    <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between">
                            <h2 className='text-xl'><strong>{buttonLabel}</strong></h2>
                            <ActionButton bgColor={'light-rose'} className='m-0 p-0'>
                                <CancelIcon onClick={togglePopup} />
                            </ActionButton>
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PopUpLayout;
