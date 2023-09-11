import React, { useEffect, useState } from "react"

function SalespersonHistory() {
    const [sales, setSales] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [salesperson, setSalesperson] = useState('');

    const fetchSales = async () => {
        const url = "http://localhost:8090/api/sales/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);
        
    const fetchSalespeople = async () => {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    };

    useEffect(() => {
        fetchSalespeople();
    }, []);


    const handleSalespersonChange = async (e) => {
        setSalesperson(e.target.value);
        const url = `http://localhost:8090/api/sales/history/${salesperson.id}/`;
        const response = await fetch(url);
        if (response.ok) {
            const searchJsonData = await response.json();
            setSales(searchJsonData);
        }
    };

    return (
        <>
            <div>
                <h1>Salesperson History</h1>
                <label htmlFor="salesperson-select">Select a Salesperson</label>
                <div className="mb-3">
                    <select onChange={handleSalespersonChange} value={salesperson} required name="salesperson" id="salesperson" className="form-select">
                        <option value="">Choose a Salesperson...</option>
                        {salespeople.map(salesperson => {
                            return(
                                <option key={salesperson.employee_id} value={salesperson.id}>{salesperson.first_name} {salesperson.last_name}</option>
                            )
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
                        {sales.filter((sale) => sale.salesperson.id ).map((sale) => {
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

