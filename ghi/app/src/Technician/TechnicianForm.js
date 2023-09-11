import React, { useState } from 'react';

function TechnicianForm () {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        employee_id: '',
    })

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const technicianUrl = "http://localhost:8080/api/technicians/";
        
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const response = await fetch(technicianUrl, fetchConfig);
        
        if (response.ok) {
            setFormData({
                first_name: '',
                last_name: '',
                employee_id: '',
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
                        <h1 className='py-2'>Add a Technician</h1>
                        <form onSubmit={handleSubmit} id="new-technician-form">
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
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TechnicianForm;