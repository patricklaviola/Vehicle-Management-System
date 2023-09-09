// Get a specific Salesperson Sale History!
// Create 'Salesperson History' link in navbar!

/*
- Salesperson History page shows a list of sales associated with a specific salesperson.
- Each sale should contain: the salesperson, the customer, the automobile VIN, and the price of the sale.
*/

import React, { useEffect, useState } from "react"

function SalespersonHistory(props) {
    // Define state variables to store sales data
    const [sales, setSales] = useState([]);
    const [specifiedSalesperson, setSpecifiedSalesperson] = useState('');
    const [salespersonSaleData, setSalespersonSaleData] = useState(null);

    // Define a function to handle changes to the specified salesperson input field
    const handleSpecifiedSalespersonChange = (e) => {
        setSpecifiedSalesperson(e.target.value);
    };

    // Define fetchSalesDataForSpecifiedSalesperson function to fetch sales data for the specified salesperson
    // and call it when the component mounts:
    const fetchSalesDataForSpecifiedSalesperson = async () => {
        // Send GET request to the sales API endpoint
        const salesUrl = "http://localhost:8090/api/sales/";
        const salesResponse = await fetch(salesUrl);
        // If the request is successful, update state variable with response data
        if (salesResponse.ok) {
            const salesJson = await salesResponse.json();
            setSales(salesJson.sales);
        }
    }

    // Call fetchSalesDataForSpecifiedSalesperson function when component mounts to update state variables 
    // with inital data using useEffect hook:
    useEffect(() => {
        fetchSalesDataForSpecifiedSalesperson();
    }, []);

    const filteredSales = specifiedSalesperson
    ? sales.filter((sale) =>
        `${sale.salesperson.first_name} ${sale.salesperson.last_name}`
        .toLowerCase()
        .includes(specifiedSalesperson.toLowerCase())
      )
    : sales;

    // Define handleSubmit function to handle form submission and update state with the specified salesperson
    // and their associated sales data 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const salespersonSaleData = {
          specifiedSalesperson: specifiedSalesperson,
          sales: filteredSales,
        };
        // Set the salespersonSaleData object to state to trigger a re-render and display the data on the page
        setSalespersonSaleData(salespersonSaleData);
    };

    // Return JSX element that renders form with the input fields for Salesperson's name and submit button.
    // The select and option tags are formatted differently than input tags
    return (
        <>
            <div className="row">
                <div className ="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Salesperson History</h1>
                        {/* Render a form with a select input for specifying the salesperson and a submit button */}
                        <form onSubmit={handleSubmit} id="salesperson-history-form">
                            <div className="form-floating mb-3">
                                <label htmlFor="salesperson-select">Select a Salesperson</label>
                                <select className="form-select" required id="salesperson-select" value={specifiedSalesperson} onChange={(e) => handleSpecifiedSalespersonChange(e.target.value)}>
                                    <option value="">All Salespeople</option>
                                    {sales.map((sale) => (
                                        <option key={sale.id} value={`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}>
                                        {`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <h2 className="salesperson-list-heading" id="salesperson-sales-heading">Sales</h2>
            <p>Specified Salesperson: {salespersonSaleData.specifiedSalesperson}</p>
            {salespersonSaleData && (
                <div>
                    <table className="table table-success table-striped">
                        <thead>
                            <tr>
                                <th>Sale ID</th>
                                <th>Employee ID</th>
                                <th>Customer</th>
                                <th>VIN</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salespersonSaleData.sales.map(sale => {
                                return (
                                    <tr key={sale.id}>
                                        <td>{sale.salesperson.employee_id}</td>
                                        <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                        <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                        <td>{sale.automobile.vin}</td>
                                        <td>{sale.price}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default SalespersonHistory;