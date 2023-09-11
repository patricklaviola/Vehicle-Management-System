import React, { useState, useEffect} from 'react';

function AppointmentForm () {
    const [technicians, setTechnicians] = useState([])
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        reason: '',
        vin: '',
        customer: '',
        technician: '',
    })

    const getData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }
    
    useEffect(() => {
        getData();
    }, []);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const apointmentUrl = "http://localhost:8080/api/appointments/";

        const { date, time, ...restFormData } = formData;
        const date_time = `${formData.date}T${formData.time}:00`;

        const updatedFormData = { ...restFormData, date_time };
        
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(updatedFormData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        console.log('Sending', updatedFormData);

        const response = await fetch(apointmentUrl, fetchConfig);
        
        if (!response.ok) {
            const text = await response.text();
            console.log('Error', text);
        }
        
        if (response.ok) {
            setFormData({
                date: '',
                time: '',
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
                        <h1 className='py-4'>Create a service appointment</h1>
                        <form onSubmit={handleSubmit} id="new-appointment-form">

                            <label htmlFor='vin'>Automobile VIN</label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" required name="vin" id="vin" value={formData.vin} onChange={handleFormChange}/>
                                </div>

                            <label htmlFor='customer'>Customer</label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" required name="customer" id="customer" value={formData.customer} onChange={handleFormChange}/>
                                </div>

                            <label htmlFor='date'>Date</label>
                                <div className="mb-3">
                                    <input className="form-control" type="date" required name="date" id="date" value={formData.date} onChange={handleFormChange}/>
                                </div>

                            <label htmlFor='time'>Time</label>
                                <div className="mb-3">
                                    <input className="form-control" type="time" required name="time" id="time" value={formData.time} onChange={handleFormChange}/>
                                </div>

                            <label htmlFor='technician'>Technician</label>
                                <div className="mb-3">
                                    <select onChange={handleFormChange} value={formData.technician} required name="technician" id="technician" className="form-select">
                                        <option value="">Choose a technician...</option>
                                        {technicians.map(technician => {
                                        return (
                                            <option key={technician.employee_id} value={technician.id}>{technician.first_name} {technician.last_name}</option>
                                        )
                                        })}
                                    </select>
                                </div>

                            <label htmlFor='reason'>Reason</label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" required name="reason" id="reason" value={formData.reason} onChange={handleFormChange}/>
                                </div>


                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppointmentForm;