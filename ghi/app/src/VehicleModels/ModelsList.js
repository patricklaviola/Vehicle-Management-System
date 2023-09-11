import { useEffect, useState } from 'react';

function ModelsList() {
    const [models, setModels] = useState([])

    const fetchModelsData = async () => {
        const response = await fetch("http://localhost:8100/api/models/");
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(() => {
        fetchModelsData();
    }, []);
    
    return (
        <>
            <h1 className="list-heading py-4" id="models-heading">Models</h1>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Manufacturer</th>
                            <th>Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {models.map(model => {
                            return (
                                <tr key={model.name}>
                                    <td>{model.name}</td>
                                    <td>{model.manufacturer.name}</td>
                                    <td>
                                        <img style={{width: 200, height: 200}} src={model.picture_url} alt={model.name} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ModelsList;