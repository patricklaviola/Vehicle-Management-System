import { useEffect, useState } from 'react';


function ManufacturersList() {
    const [manufacturers, setManufacturers] = useState([])

    const fetchManufacturersData = async () => {
        const response = await fetch("http://localhost:8100/api/manufacturers/");
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        fetchManufacturersData();
    }, []);

    return (
        <>
            <h1 className='py-4'>Manufacturers</h1>
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