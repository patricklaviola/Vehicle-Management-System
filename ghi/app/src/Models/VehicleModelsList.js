// Show a list of VehicleModels in Inventory!
// Create 'Models' link in navbar!

function ModelsList({ models }) {
    return (
        <>
            <h1 className="list-heading" id="models-heading">Models</h1>
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
                                        <img style={{width: 300, height: 300}} src={model.picture} alt={model.name} />
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