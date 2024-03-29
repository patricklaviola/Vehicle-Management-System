import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function ModelForm() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [picture_url, setPictureUrl] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [manufacturers, setManufacturers] = useState([]);
    const [models, setModels] = useState([]);

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    };

    const handlePictureChange = (e) => {
        const value = e.target.value;
        setPictureUrl(value);
    };

    const handleManufacturerChange = (e) => {
        const value = e.target.value;
        setManufacturer(value);
    };

    const fetchManufacturers = async () => {
        const manufacturerResponse = await fetch("http://localhost:8100/api/manufacturers/");
        if (manufacturerResponse.ok) {
            const manufacturerJsonData = await manufacturerResponse.json();
            setManufacturers(manufacturerJsonData.manufacturers);
        }
    };

    const fetchModels = async () => {
        const modelResponse = await fetch("http://localhost:8100/api/models/");
        if (modelResponse.ok) {
            const modelJsonData = await modelResponse.json();
            setModels(modelJsonData.models);
        }
    };

    useEffect(() => {
        fetchManufacturers();
        fetchModels();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newManufacturerData = {
            name: name,
            picture_url: picture_url,
            manufacturer: manufacturer,
        };

        // fetchModels, send prop to ModelForm
        const modelsUrl = `http://localhost:8100/api/models/`;
        const modelsFetchConfig = {
            method: "POST",
            body: JSON.stringify(newManufacturerData),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const modelResponse = await fetch(modelsUrl, modelsFetchConfig);
        if (modelResponse.ok) {
            setName('');
            setPictureUrl('');
            setManufacturer('');
            navigate("/models")
        }
    };
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 className="py-4">Create a vehicle model</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <input className="form-control" type="text" placeholder="Model name..." required name="name" id="name" value={name} onChange={handleNameChange} />
                        </div>

                        <div className="mb-3">
                            <input className="form-control" type="url" placeholder="Picture URL..." required name="picture" id="picture" value={picture_url} onChange={handlePictureChange} />
                        </div>

                        <div className="mb-3">
                            <select className="form-select" required name="manfacturer" id="manufacturer" value={manufacturer} onChange={handleManufacturerChange} >
                                <option value="manufacturers">Choose an Manufacturer...</option>
                                {manufacturers.map((manufacturer) => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ModelForm;
