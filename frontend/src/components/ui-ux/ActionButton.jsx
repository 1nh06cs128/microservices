import React, { memo } from 'react';

const ActionButton = ({ onClick, disabled, bgColor, className, children }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                border-0 focus:outline-none
                bg-${bgColor}-500
                hover:bg-${bgColor}-600
                rounded
                text-md
                ${className}`
            }
        >
            {children}
        </button>
    );
};

export default memo(ActionButton);
