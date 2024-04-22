import React, { useState } from 'react'
import BrowserInfo from './BrowserInfo'

const Contacts = () => {

    const [formData, setFormData] = useState({
        subject: '',
        email: '',
        details: '',
        department: '',
        agreement: false
    });

    const handleChange = (e) => {
        const { email, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send email.');
            }

            console.log('Email sent successfully.');
            // Reset form after submission
            setFormData({
                subject: '',
                email: '',
                details: '',
                department: '',
                agreement: false
            });
        } catch (error) {
            console.error('Error sending email:', error.message);
        }
    };


    return (
        <section>
            <div>
                <h1 className="text-5xl"> <strong>Contact </strong></h1>
                <p className="text-gray-500"> Got any questions? Let's talk about it </p>
            </div>

            <div className="flex w-full mt-10">
                <div className='w-1/4'>
                    <h1 className="text-2xl"> <strong>Address </strong></h1>
                    <p className="text-gray-500"> #404 <br />Localhost - 127001</p>
                </div>
                <div className='w-1/4'>
                    <h1 className="text-2xl"> <strong>Email </strong></h1>
                    <p className="text-gray-500"> sb.1nh06cs128@gmail.com </p>
                </div>
                <div className='w-1/2'>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center">
                            <p className="mr-5"><strong>Department: </strong></p>
                            <div className="mr-5 flex items-center" ><input type="radio" /><label>{'\u00A0'}Support</label></div>
                            <div className="mr-5 flex items-center" ><input type="radio" /><label>{'\u00A0'}Sales</label></div>
                        </div>
                        <input placeholder="Your Email-Id" className="placeholder:text-sm block p-1 mt-3 h-9 rounded w-full" />
                        <input placeholder="Subject" className="placeholder:text-sm block p-1 mt-3 h-9 rounded w-full" />
                        <textarea placeholder="Details" className="placeholder:text-sm block p-1 mt-3 h-36 rounded w-full" />
                        <div className="flex justify-between">
                            <div className="pr-1 mt-2 flex items-center">
                                <input type='checkbox' />
                                <span className="text-xs"><strong> {'\u00A0'}I agree to the Terms and Conditions.</strong></span>
                            </div>
                            <button className="border bg-green-600 mt-3 p-1 rounded text-white w-20">Start</button>
                        </div>
                    </form>
                </div>

            </div>


        </section>
    )
}

export default Contacts