// Create a new instance of Automobile in Inventory!
// Create 'Create an Automobile' link in navbar!
import { useEffect, useState } from "react";


function AutomobileForm({fetchAutomobiles}) {
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [model, setModel] = useState('');
    const [models, setModels] = useState([]);

    const handleColorChange = (e) => {
        setColor(e.target.value);
    };
    const handleYearChange = (e) => {
        setYear(e.target.value);
    };
    const handleVinChange = (e) => {
        setVin(e.target.value);
    };
    const handleModelChange = (e) => {
        setModel(e.target.value);
    };

    const fetchModels = async () => {
        const modelResponse = await fetch("http://localhost:8100/api/models/");
        if (modelResponse.ok) {
            const modelJsonData = await modelResponse.json();
            setModels(modelJsonData.models);
        }
    };

    useEffect(() => {
        fetchModels();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAutomobileData = {
            color: color,
            year: year,
            vin: vin,
            model: model,
        };
        // fetchAutomobiles, pass as prop to AutomobileForm
        const automobileUrl = "http://localhost:8100/api/automobiles/";
        const automobileFetchConfig = {
            method: "POST",
            body: JSON.stringify(newAutomobileData),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const automobileResponse = await fetch(automobileUrl, automobileFetchConfig);
        
        if (automobileResponse.ok) {
            fetchAutomobiles();
            setColor('');
            setYear('');
            setVin('');
            setModel('');
        }
    };

    return (
        <>
            <div className="row">
                <div className ="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <div>
                            <h1>Add an Automobile to Inventory</h1>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="color">Color</label>
                                    <div className="mb-3">
                                        <input className="form-control" type="text" placeholder="Color..." required name="color" id="color" value={color} onChange={handleColorChange}/>
                                    </div>
                                <label htmlFor="year">Year</label>
                                    <div className="mb-3">
                                        <input className="form-control" type="text" placeholder="Year..." required name="year" id="year" value={year} onChange={handleYearChange}/>
                                    </div>
                                <label htmlFor="vin">Automobile VIN</label>
                                    <div className="mb-3">
                                        <input className="form-control" type="text" placeholder="VIN..." required name="vin" id="vin" value={vin} onChange={handleVinChange} />
                                    </div>
                                <div className="mb-3">
                                    <select className="form-select"  required name="model" id="model" value={model} onChange={handleModelChange} >
                                        <option value="models">Choose a model...</option>
                                        {models.map((model) => {
                                            return (
                                                <option key={model.id} value={model.id}>
                                                    {model.manufacturer.name} {model.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <button className="btn btn-primary">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AutomobileForm;