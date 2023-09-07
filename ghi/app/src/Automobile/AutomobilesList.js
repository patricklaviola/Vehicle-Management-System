// Show a list of Automobiles in Inventory!
// Create 'Automobiles' link in navbar!

function AutomobilesList({ automobiles}) {
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
                        {automobiles.map(auto => {
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