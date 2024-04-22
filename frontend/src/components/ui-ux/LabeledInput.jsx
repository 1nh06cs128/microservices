import React, { useState, useEffect, memo, forwardRef, useRef, useImperativeHandle } from 'react';

const TextInput = forwardRef(({
    defaultValue = '',
    id,
    label,
    className,
    placeholder = '',
    inputType = 'text',
    inputWidth = 'w-full',
    leftIcon,
    rightIcon,
    maxLen,
    disabled,
    leftIconColor = 'black',
    rightIconColor = 'black',
    informParentOnInputChange,
    ...props
}, ref) => {

    const internalComponentRef = useRef(null);

    const [value, setValue] = useState(defaultValue);

    const retrieve = () => {
        return value;
    }
    const clearValue = () => {
        setValue('');
    }
    const valueChanged = (event) => {
        setValue(event.target.value);
        informParentOnInputChange(event);
    };

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    // Attach the retrieveData function to the ref so it can be accessed by the parent
    useImperativeHandle(ref, () => ({
        retrieve,
        clearValue,
        focus: () => internalComponentRef.current.focus(), // Forwarding focus method
    }));

    // const focusInput = () => { internalComponentRef.current.focus(); };

    return (

        // <div className='relative'>
        <div className={`${className} relative mt-2`}>

            {/* Left Icon */}
            {leftIcon && (
                <div className={`absolute flex h-12 w-12 bg-${leftIconColor}-300`}>
                    <div className={`m-auto text-${leftIconColor}-700`}>
                        {leftIcon}
                    </div>
                </div>
            )}
            <div className="relative">
                <input
                    {...props}
                    ref={internalComponentRef}
                    type={inputType}
                    id={label.toLowerCase().replace(/\s(.)/g, function (word, letter) {
                        return letter.toUpperCase();
                    })}
                    placeholder={placeholder}
                    value={value}
                    maxLength={maxLen}
                    autoComplete="off"  // Add this line to disable autofill suggestions
                    name={label.toLowerCase().replace(/\s(.)/g, function (word, letter) {
                        return letter.toUpperCase();
                    })}
                    onChange={valueChanged}
                    disabled={disabled}
                    className={`
                            ${inputWidth}
                            placeholder-transparent
                            peer block
                            align-baseline
                            h-12 w-full text-blue-700
                            border-b-2 border-rose-600
                            focus:border-blue-500
                            focus:outline-none
                            focus:border-rose-600
                            focus:caret-rose-600
                            ${leftIcon ? `px-14 pt-5` : `px-2 pt-5`}
                        `}
                />

                {/* Right Icon */}
                {rightIcon && (
                    <div className={`absolute right-0 inset-y-0 flex h-12 w-12 bg-${rightIconColor}-300`}>
                        <div className={`text-${rightIconColor}-700 m-auto`}>
                            {/* <div className="m-auto"> */}
                            {rightIcon}
                        </div>
                    </div>
                )}

                {/* Item Label */}
                {label && (<label
                    htmlFor={id}
                    className={`
                            absolute
                            uppercase
                            text-sm
                            text-slate-600
                            transition-all
                            italic
                            peer-focus:text-rose-600
                            peer-focus:text-sm
                            peer-placeholder-shown:text-base
                            peer-placeholder-shown:text-slate-900
                            peer-placeholder-shown:top-5
                            -top-0
                            cursor-text
                            peer-focus:top-0
                            ${leftIcon ? `left-14 peer-focus:left-14` : `left-2 peer-focus:left-2`}
                        `}
                    onClick={() => internalComponentRef.current.focus()}
                >
                    {label} </label>
                )}
            </div>
        </div>
    )
});

export default memo(TextInput);
