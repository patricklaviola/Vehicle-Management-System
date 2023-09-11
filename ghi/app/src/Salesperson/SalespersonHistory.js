// Get a specific Salesperson Sale History!
// Create 'Salesperson History' link in navbar!

/*
- Salesperson History page shows a list of sales associated with a specific salesperson.
- Each sale should contain: the salesperson, the customer, the automobile VIN, and the price of the sale.
*/

import React, { useEffect, useState } from "react"

function SalespersonHistory() {
    const [sales, setSales] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [salesperson, setSalesperson] = useState('');

    const handleSalespersonChange = async (e) => {
        setSalesperson(e.target.value);
        const salespersonUrl = `http://localhost:8090/api/sales/history/${salesperson.salesperson.id}/`;
        const searchResponse = await fetch(salespersonUrl);
        if (searchResponse.ok) {
            const searchJsonData = await searchResponse.json();
            setSales(searchJsonData.sales);
        }
    };

    const fetchSalespersonData = async () => {
        // salesperson
        const salespersonResponse = await fetch("http://localhost:8090/api/salespeople/");
        if (salespersonResponse.ok) {
            const salespersonJsonData = await salespersonResponse.json();
            setSalespeople(salespersonJsonData.salespeople);
        }
        // sales
        const salesResponse = await fetch("http://localhost:8090/api/sales/");
        if (salesResponse.ok) {
            const salesJsonData = await salesResponse.json();
            setSales(salesJsonData.sales);
        }
    };

    useEffect(() => {
        fetchSalespersonData();
    }, []);

    return (
        <>
            <div>
                <h1>Salesperson History</h1>
                <label htmlFor="salesperson-select">Select a Salesperson</label>
                <div className="mb-3">
                    <select className="form-select" required name="salesperson" id="salesperson" value={salesperson} onChange={handleSalespersonChange}>
                        <option value="">Select a salesperson...</option>
                        {salespeople.map((salesperson) => {
                            return (
                                <option key={salesperson.id} value={salesperson.employee_id}>
                                    {salesperson.first_name} {salesperson.last_name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Salesperson</th>
                                <th>Customer</th>
                                <th>VIN</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.filter((sale) => {
                                return sale.salesperson.employee_id.toString() === salesperson;
                            }).map((sale) => {
                                return (
                                    <tr key={sale.id}>
                                        <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                        <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                        <td>{sale.automobile.vin}</td>
                                        <td>{sale.price}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default SalespersonHistory;