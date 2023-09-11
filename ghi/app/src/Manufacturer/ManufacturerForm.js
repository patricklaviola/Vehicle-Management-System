import React, { useState } from "react";

function ManufacturerForm({fetchManufacturers}) {
    const [manufacturer, setManufacturer] = useState('');

    const handleManufacturerNameChange = (e) => {
        const value = e.target.value;
        setManufacturer(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newManufacturerData = {
            manufacturer: manufacturer,
        };

        const manufacturerUrl = `http://localhost:8100/api/manufacturers/`;
        const manufacturerFetchConfig = {
            method: "POST",
            body: JSON.stringify(newManufacturerData),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(manufacturerUrl, manufacturerFetchConfig);
        if (response.ok) {
            fetchManufacturers();
            setManufacturer('');
        }
    };
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Manufacturer</h1>
                    <form onSubmit={handleSubmit}>
                    <label htmlFor="manufacturer_name">Manufacturer Name</label>
                        <div className="mb-3">
                            <input className="form-control" type="text" placeholder="Manufacturer name..." required name="manufacturer" id="manufacturer" value={manufacturer} onChange={handleManufacturerNameChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ManufacturerForm;
