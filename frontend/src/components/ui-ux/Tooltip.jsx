import React, { useState } from 'react';

function Tooltip({ text }) {

    return (
        <div>
            <div className="tooltip absolute bg-gray-800 text-white p-2 m-2 rounded text-xs italic z-10 max-w-screen-sm text-justified" >
                {text}
            </div>
        </div>
    );
}

export default Tooltip;
