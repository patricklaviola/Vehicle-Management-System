import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SalespersonForm () {
    const navigate = useNavigate();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [employee_id, setEmployeeId] = useState('');

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    const handleEmployeeIdChange = (e) => {
        setEmployeeId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSalespersonData = {
            first_name: first_name,
            last_name: last_name,
            employee_id: employee_id
        };

        const salespersonUrl = "http://localhost:8090/api/salespeople/";
        const salespersonFetchConfig = {
            method: "POST",
            body: JSON.stringify(newSalespersonData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const salespersonResponse = await fetch(salespersonUrl, salespersonFetchConfig);
        
        if (salespersonResponse.ok) {
            setFirstName('');
            setLastName('');
            setEmployeeId('');
            navigate("/salespeople")
        };
    };
    
    return (
        <>
            <div className="row">
                <div className ="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a Salesperson</h1>
                        <form onSubmit={handleSubmit} id="new-salesperson-form">
                            <label htmlFor='first_name'>First Name</label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="First Name..." required name="first_name" id="first_name" value={first_name} onChange={handleFirstNameChange}/>
                                </div>
                            <label htmlFor='last_name'>Last Name</label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder='Last Name...' required name="last_name" id="last_name" value={last_name} onChange={handleLastNameChange}/>
                                </div>
                            <label htmlFor='employee_id'>Employee ID</label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="Employee ID..." required name="employee_id" id="employee_id" value={employee_id} onChange={handleEmployeeIdChange}/>
                                </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SalespersonForm;