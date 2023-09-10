import { useEffect, useState } from 'react';


function SalespeopleList() {
    const [salespeople, setSalespeople] = useState([])

    const fetchSalespeopleData = async () => {
        const response = await fetch("http://localhost:8090/api/salespeople/");
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    }

    useEffect(() => {
        fetchSalespeopleData();
    }, []);
    
    return (
        <>
            <h1 className="list-heading" id="salespeople-heading">Salespeople</h1>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salespeople.map(salesperson => {
                            return (
                                <tr key={salesperson.id}>
                                    <td>{salesperson.employee_id}</td>
                                    <td>{salesperson.first_name}</td>
                                    <td>{salesperson.last_name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SalespeopleList;