import { useEffect, useState } from 'react';

function AutomobilesList() {
    const [autos, setAutos] = useState([])

    const fetchAutosData = async () => {
        const response = await fetch("http://localhost:8100/api/automobiles/");
        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
        }
    }

    useEffect(() => {
        fetchAutosData();
    }, []);

    return (
        <>
            <h1 className="list-heading" id="automobiles-heading">Automobiles</h1>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Color</th>
                            <th>Year</th>
                            <th>Model</th>
                            <th>Manufacturer</th>
                            <th>Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {autos.map(auto => {
                            return (
                                <tr key={auto.vin}>
                                    <td>{auto.vin}</td>
                                    <td>{auto.color}</td>
                                    <td>{auto.year}</td>
                                    <td>{auto.model.name}</td>
                                    <td>{auto.model.manufacturer.name}</td>
                                    <td>{auto.sold ? "Yes" : "No"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AutomobilesList;