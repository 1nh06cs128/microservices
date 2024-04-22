import React, { memo, useState, useEffect, useImperativeHandle } from 'react';

const ButtonElement = (({
    label = '',
    type,
    icon, className, bgColor,
    handleButtonClickOnParent,
    enableDisabledToggle
}) => {

    const [enableDisabledState, setEnableDisabledState] = useState(false);

    // console.log(label, " has type - ", type);

    useEffect(() => {
        setEnableDisabledState(enableDisabledToggle); // Update disabled state when prop changes
    }, [enableDisabledToggle]);

    // const handleOnClick = (e) => {
    //     e.preventDefault();
    //     console.log('onClick Called');
    //     handleButtonClickOnParent();
    // }

    return (
        <>
            <button
                className={`
                    ${className}
                    justify-between
                    items-center
                    text-white
                    bg-${bgColor}-600
                    border-0
                    mt-2
                    h-12 px-6
                    focus:outline-none
                    hover:bg-${bgColor}-700
                    rounded
                    disabled:opacity-50
                `}
                type={type}
                disabled={enableDisabledToggle}
                onClick={handleButtonClickOnParent}
            >
                <div className="right-0 inset-y-0">
                    {/* <div className=""> */}
                    {(icon && label) ?
                        <div className="flex w-12 h-12">
                            <div className="m-auto">
                                {icon && icon}
                            </div>
                            <div className="m-auto">
                                {label && label}
                            </div>
                        </div>
                        :
                        <div>
                            {icon && icon}
                            {label && label}
                        </div>
                    }
                </div>
            </button>
        </>
    )

});

// export default memo(ButtonElement)
export default ButtonElement