import React, { useEffect, useState } from 'react'

import ConfigurationValidations from './ConfigurationValidations'

const Configurations = () => {

    const [counter, setCounter] = useState(0);

    const [values, setValues] = useState({
        productName: '',
        quantity: ''
    });

    const [errors, setErrors] = useState({
        productName: '',
        quantity: ''
    });

    // not required to have inside the effect, value is set on re-render directly.
    const canSubmit = Boolean(values.productName && values.quantity);

    useEffect(() => {
        const interval = 1000 * 1;
        const addInterval = setInterval(() => {
            setCounter((prev) => (prev + 1));
        }, interval);

        return () => {
            clearTimeout(addInterval);
        }
    }, [counter]);

    const onSubmitClickHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://api.example.com/configurations', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers as needed
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                // Handle success response
                console.log('Configuration updated successfully');
            } else {
                // Handle error response
                console.error('Failed to update configuration:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating configuration:', error);
        }
    }

    const handleInputValueChange = (event) => {
        const { name, value } = event.target;
        // in below [name] serves as dynamic object property inside object literal
        // used to update values object only at a minute level
        setValues((prev) => ({ ...prev, [name]: value }));
        const updatedErrors = { ...errors };
        // in below line [name] serves as dynamic accessor to object property
        // meaning configVal takes values object and returns errors object.
        // in that error object we find errors[name] and update only the specific property for that object.
        updatedErrors[name] = ConfigurationValidations({ ...values, [name]: value })[name];
        // creating a shallow copy of errors and updating with new validation and then assigning back that object to errors
        setErrors(updatedErrors);

        // setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error message when input value changes
    };

    return (
        <>

            <div>
                {counter}
            </div>
            <form noValidate className="w-full">
                <div className="mt-2">
                    <input
                        className=""
                        type="text"
                        required
                        name="productName"
                        value={values.productName}
                        placeholder="Product Name"
                        onChange={handleInputValueChange}
                    />
                </div>
                <p>
                    {errors.productName && <span>{errors.productName}</span>}
                </p>
                <div className="mt-2">
                    <input
                        className=""
                        type="number"
                        required
                        name="quantity"
                        value={values.quantity}
                        placeholder="Quantity"
                        onChange={handleInputValueChange}
                    />
                </div>
                <p>
                    {errors.quantity && <span>{errors.quantity}</span>}
                </p>
                <div className="mt-2">
                    <button
                        onSubmit={onSubmitClickHandler}
                        type="submit"
                        disabled={!canSubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}

export default Configurations