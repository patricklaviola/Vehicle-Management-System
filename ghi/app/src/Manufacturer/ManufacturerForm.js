import React, { useState } from 'react';

function ManufacturerForm () {
    const [formData, setFormData] = useState({
        name: '',
    })

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
        
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const response = await fetch(manufacturerUrl, fetchConfig);
        
        if (response.ok) {
            setFormData({
                name: '',
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
                        <h1 className='py-2'>Create a manufacturer</h1>
                        <form onSubmit={handleSubmit} id="new-manufacturer-form">
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="Manufacturer name..." required name="name" id="name" value={formData.name} onChange={handleFormChange}/>
                                </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManufacturerForm;
