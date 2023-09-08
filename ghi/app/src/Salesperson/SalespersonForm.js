// Create a new instance of Salesperson in Service!
// Create link 'Add a Salesperson' link in navbar!

import React, { useState } from 'react';

function SalespersonForm ({fetchSalespeople}) {
    // Define state variables using useState hook to manage the following:
    const [first_name, setFirstName] = useState([]);
    const [last_name, setLastName] = useState([]);
    const [employee_id, setEmployeeId] = useState([]);

    // Define event handlers for each input field using useState hook:
    // Updates specified first name
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    // Updates specified last name
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    // Updates specified employee id
    const handleEmployeeIdChange = (e) => {
        setEmployeeId(e.target.value);
    };

    // Define handleSubmit function to handle form submission
    const handleSubmit = async (e) => {
        // Prevent default from submission behavior
        e.preventDefaulkt();
        // Create newSalespersonData object with selected data
        const newSalespersonData = {
            first_name: first_name,
            last_name: last_name,
            employee_id: employee_id
        };

        // Define URL and fetch configuration for new salesperson data 
        const salespersonUrl = "http://localhost:8090/api/salespeople/";
        const salespersonFetchConfig = {
            method: "POST",
            body: JSON.stringify(newSalespersonData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // Send POST request to the salespeople API endpoint with newSalespersonData as the body
        const salespersonResponse = await fetch(salespersonUrl, salespersonFetchConfig);
        
        // If request is successful, update the state variables using the fetch function for salespeople
        if (salespersonResponse.ok) {
            // Fetch updated data from API endpoint
            fetchSalespeople();
            // Reset input fields to their inital state 
            setFirstName('');
            setLastName('');
            setEmployeeId('');
        };
    };
    
    // Return JSX element that renders form with input fields for first name, last name, and employee id, and submit button 
    return (
        <>
            <div className="row">
                <div className ="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a Salesperson</h1>
                        <form onSubmit={handleSubmit} id="new-salesperson-form">
                            <label htmlFor='first_name'>First Name</label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="First Name" required name="first_name" id="first_name" value={first_name} onChange={handleFirstNameChange}/>
                                </div>
                            <label htmlFor='last_name'>Last Name</label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder='Last Name' required name="last_name" id="last_name" value={last_name} onChange={handleLastNameChange}/>
                                </div>
                            <label htmlFor='employee_id'>Employee ID</label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="Employee ID" required name="employee_id" id="employee_id" value={employee_id} onChange={handleEmployeeIdChange}/>
                                </div>
                            <button className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SalespersonForm;