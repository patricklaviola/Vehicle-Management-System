// Create a new instance of Customer in Sales!
// Create 'Add Customer' link in navbar!

import React, { useState } from 'react';

function CustomerForm ({fetchCustomers}) {
    // Define state variables using useState hook to manage the following:
    const [first_name, setFirstName] = useState([]);
    const [last_name, setLastName] = useState([]);
    const [address, setAddress] = useState([]);
    const [phone_number, setPhoneNumber] = useState([]);

    // Define event handlers for each input field using useState hook:
    // Updates specified first name
    const handleFirstNameChange = e => {
        setFirstName(e.target.value);
    };
    // Updates specified last name
    const handleLastNameChange = e => {
        setLastName(e.target.value);
    };
    // Updates specified address
    const handleAddressChange = e => {
        setAddress(e.target.value);
    };
    // Updates specified phone number
    const handlePhoneNumberChange= (e) =>{
        setPhoneNumber(e.target.value);
    };

    // Define handleSubmit function to handle form submission
    const handleSubmit = async (e) => {
        // Prevent default from submission behavior
        e.preventDefault();
        // Create newCustomerData object with selected data
        const newCustomerData = {
            first_name: first_name,
            last_name: last_name,
            address: address,
            phone_number: phone_number
        };

        // Send POST request to the sales API endpoint with newCustomerData as the body
        const customerUrl = "http://localhost:8090/api/customers";
        const customerFetchConfig = {
            method: "POST",
            body: JSON.stringify(newCustomerData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // If request is successful, update state variables using fetch function for customers, and reset all input fields to their initial state. 
        const customerFetchResponse = await fetch(customerUrl, customerFetchConfig);
        if (customerFetchResponse.ok) {
            fetchCustomers();
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
        };
    };

    // Return JSX element that displays a form with the input fields for first_name, last_name, address, and phone_number, and submit button.
    return (
        <>
            <div className="row">
                <div className ="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a Customer</h1>
                        <form onSubmit={handleSubmit} id="new-customer-form">
                            <label htmlFor='first_name'>First Name</label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="First Name..." required name="first_name" id="first_name" value={first_name} onChange={handleFirstNameChange}/>
                                </div>
                            <label htmlFor='last_name'>Last Name</label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="Last Name..." required name="last_name" id="last_name" value={last_name} onChange={handleLastNameChange}/>
                                </div>
                            <label htmlFor='address'>Address</label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="Address..." required name="address" id="address" value={address} onChange={handleAddressChange}/>
                                </div>
                            <label htmlFor='phone_number'>Phone Number</label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="Phone Number..." required name="phone_number" id="phone_number" value={phone_number} onChange={handlePhoneNumberChange}/>
                                </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>    
        </>
    );
};

export default CustomerForm;