import React, { useState } from 'react';

function AppointmentForm () {
    const [formData, setFormData] = useState({
        date_time: '',
        reason: '',
        vin: '',
        customer: '',
        technician: '',
    })

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const apointmentUrl = "http://localhost:8080/api/appointments/";
        
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const response = await fetch(apointmentUrl, fetchConfig);
        
        if (response.ok) {
            setFormData({
                date_time: '',
                reason: '',
                vin: '',
                customer: '',
                technician: '',
            });
        }
    }
    
    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
          ...formData,
          [inputName]: value 
        });
      }


    return (
        <>
            <div className="row">
                <div className ="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a service appointment</h1>
                        <form onSubmit={handleSubmit} id="new-appointment-form">
                            <label htmlFor='first_name'></label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="First Name..." required name="first_name" id="first_name" value={formData.first_name} onChange={handleFormChange}/>
                                </div>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder='Last Name...' required name="last_name" id="last_name" value={formData.last_name} onChange={handleFormChange}/>
                                </div>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="Employee ID..." required name="employee_id" id="employee_id" value={formData.employee_id} onChange={handleFormChange}/>
                                </div>
                            <button className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppointmentForm;