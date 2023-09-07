// Show a list of Manufacturers!
// Create 'Manufacturers' link in navbar!


function ManufacturersList({ manufacturers }) {
    return (
        <>
            <h1>Manufacturers</h1>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manufacturers.map(manufacturer => {
                            return (
                                <tr key={manufacturer.id + manufacturer.name}>
                                    <td>{manufacturer.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ManufacturersList;